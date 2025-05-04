package com.footwear.ecommerce.service;

import com.footwear.ecommerce.model.*;
import com.footwear.ecommerce.payload.request.OrderItemRequest;
import com.footwear.ecommerce.payload.request.OrderRequest;
import com.footwear.ecommerce.repository.AddressRepository;
import com.footwear.ecommerce.repository.OrderRepository;
import com.footwear.ecommerce.repository.ProductRepository;
import com.footwear.ecommerce.repository.UserRepository;
import com.footwear.ecommerce.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private AddressRepository addressRepository;
    
    @Autowired
    private EmailService emailService;
    
    public List<Order> getCurrentUserOrders() {
        User user = getCurrentUser();
        return orderRepository.findByUser(user);
    }
    
    public Order getOrderById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        
        // Check if the current user is the owner of the order or an admin
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        
        if (!order.getUser().getId().equals(userDetails.getId()) && 
                !authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            throw new RuntimeException("You are not authorized to access this order");
        }
        
        return order;
    }
    
    @Transactional
    public Order createOrder(OrderRequest orderRequest) {
        User user = getCurrentUser();
        Address shippingAddress = addressRepository.findById(orderRequest.getShippingAddressId())
                .orElseThrow(() -> new RuntimeException("Shipping address not found"));
        
        if (!shippingAddress.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You are not authorized to use this address");
        }
        
        Order order = new Order();
        order.setUser(user);
        order.setShippingAddress(shippingAddress);
        order.setOrderNumber(generateOrderNumber());
        order.setOrderDate(LocalDateTime.now());
        order.setStatus(Order.OrderStatus.PENDING);
        order.setPaymentMethod(orderRequest.getPaymentMethod());
        order.setPaymentId(orderRequest.getPaymentId());
        
        List<OrderItem> orderItems = new ArrayList<>();
        BigDecimal totalAmount = BigDecimal.ZERO;
        
        for (OrderItemRequest itemRequest : orderRequest.getItems()) {
            Product product = productRepository.findById(itemRequest.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found with id: " + itemRequest.getProductId()));
            
            if (product.getStockQuantity() < itemRequest.getQuantity()) {
                throw new RuntimeException("Not enough stock for product: " + product.getName());
            }
            
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setQuantity(itemRequest.getQuantity());
            orderItem.setSize(itemRequest.getSize());
            orderItem.setColor(itemRequest.getColor());
            orderItem.setPrice(product.getPrice());
            
            orderItems.add(orderItem);
            
            // Update product stock
            product.setStockQuantity(product.getStockQuantity() - itemRequest.getQuantity());
            productRepository.save(product);
            
            // Calculate total amount
            totalAmount = totalAmount.add(product.getPrice().multiply(BigDecimal.valueOf(itemRequest.getQuantity())));
        }
        
        order.setItems(orderItems);
        order.setTotalAmount(totalAmount);
        
        // Generate OTP for delivery verification
        order.setDeliveryOtp(generateOTP());
        
        Order savedOrder = orderRepository.save(order);
        
        // Send order confirmation email
        emailService.sendOrderConfirmation(user.getEmail(), savedOrder);
        
        return savedOrder;
    }
    
    public Order updateOrderStatus(Long id, Order.OrderStatus status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        
        order.setStatus(status);
        
        if (status == Order.OrderStatus.SHIPPED) {
            // Send shipping notification with OTP
            emailService.sendShippingNotification(order.getUser().getEmail(), order);
        }
        
        return orderRepository.save(order);
    }
    
    public Order requestReturn(Long id, String reason) {
        Order order = getOrderById(id);
        
        if (order.getStatus() != Order.OrderStatus.DELIVERED) {
            throw new RuntimeException("You can only return delivered orders");
        }
        
        LocalDateTime deliveryDate = order.getDeliveryDate();
        LocalDateTime currentDate = LocalDateTime.now();
        
        if (deliveryDate.plusDays(7).isBefore(currentDate)) {
            throw new RuntimeException("Return period has expired (7 days from delivery)");
        }
        
        order.setReturnRequested(true);
        order.setReturnRequestDate(currentDate);
        order.setReturnReason(reason);
        
        // Send return request notification to admin
        emailService.sendReturnRequestNotification(order);
        
        return orderRepository.save(order);
    }
    
    public boolean verifyDeliveryOtp(Long id, String otp) {
        Order order = getOrderById(id);
        
        if (order.getStatus() != Order.OrderStatus.SHIPPED) {
            throw new RuntimeException("Order is not in shipped status");
        }
        
        if (order.getDeliveryOtp().equals(otp)) {
            order.setStatus(Order.OrderStatus.DELIVERED);
            order.setDeliveryDate(LocalDateTime.now());
            orderRepository.save(order);
            return true;
        }
        
        return false;
    }
    
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
    
    public List<Order> getOrdersByStatus(Order.OrderStatus status) {
        return orderRepository.findByStatus(status);
    }
    
    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        
        return userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
    
    private String generateOrderNumber() {
        return "ORD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
    
    private String generateOTP() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }
}
