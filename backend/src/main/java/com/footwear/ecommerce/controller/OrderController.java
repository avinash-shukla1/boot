package com.footwear.ecommerce.controller;

import com.footwear.ecommerce.model.Order;
import com.footwear.ecommerce.payload.request.OrderRequest;
import com.footwear.ecommerce.payload.request.ReturnRequest;
import com.footwear.ecommerce.payload.response.MessageResponse;
import com.footwear.ecommerce.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<List<Order>> getUserOrders() {
        List<Order> orders = orderService.getCurrentUserOrders();
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        Order order = orderService.getOrderById(id);
        return ResponseEntity.ok(order);
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Order> createOrder(@RequestBody OrderRequest orderRequest) {
        Order order = orderService.createOrder(orderRequest);
        return ResponseEntity.ok(order);
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long id, @RequestParam Order.OrderStatus status) {
        Order order = orderService.updateOrderStatus(id, status);
        return ResponseEntity.ok(order);
    }

    @PostMapping("/{id}/return")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Order> requestReturn(@PathVariable Long id, @RequestBody ReturnRequest returnRequest) {
        Order order = orderService.requestReturn(id, returnRequest.getReason());
        return ResponseEntity.ok(order);
    }

    @PostMapping("/{id}/verify-otp")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> verifyDeliveryOtp(@PathVariable Long id, @RequestParam String otp) {
        boolean verified = orderService.verifyDeliveryOtp(id, otp);
        if (verified) {
            return ResponseEntity.ok(new MessageResponse("OTP verified successfully!"));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Invalid OTP!"));
        }
    }

    @GetMapping("/admin/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/admin/status/{status}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Order>> getOrdersByStatus(@PathVariable Order.OrderStatus status) {
        List<Order> orders = orderService.getOrdersByStatus(status);
        return ResponseEntity.ok(orders);
    }
}
