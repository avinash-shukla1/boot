package com.footwear.ecommerce.service;

import com.footwear.ecommerce.model.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender emailSender;

    public void sendOrderConfirmation(String to, Order order) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Order Confirmation - " + order.getOrderNumber());
        
        StringBuilder body = new StringBuilder();
        body.append("Dear ").append(order.getUser().getFullName()).append(",\n\n");
        body.append("Thank you for your order. Your order has been confirmed.\n\n");
        body.append("Order Number: ").append(order.getOrderNumber()).append("\n");
        body.append("Order Date: ").append(order.getOrderDate()).append("\n");
        body.append("Total Amount: $").append(order.getTotalAmount()).append("\n\n");
        body.append("Order Items:\n");
        
        order.getItems().forEach(item -> {
            body.append("- ").append(item.getProduct().getName())
                .append(" (").append(item.getSize()).append(", ").append(item.getColor()).append(")")
                .append(" x ").append(item.getQuantity())
                .append(" = $").append(item.getPrice().multiply(java.math.BigDecimal.valueOf(item.getQuantity())))
                .append("\n");
        });
        
        body.append("\nShipping Address:\n");
        body.append(order.getShippingAddress().getStreet()).append("\n");
        body.append(order.getShippingAddress().getCity()).append(", ");
        body.append(order.getShippingAddress().getState()).append(" ");
        body.append(order.getShippingAddress().getZipCode()).append("\n");
        body.append(order.getShippingAddress().getCountry()).append("\n\n");
        
        body.append("Thank you for shopping with us!\n\n");
        body.append("Regards,\nFootwear E-Commerce Team");
        
        message.setText(body.toString());
        emailSender.send(message);
    }

    public void sendShippingNotification(String to, Order order) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Your Order Has Been Shipped - " + order.getOrderNumber());
        
        StringBuilder body = new StringBuilder();
        body.append("Dear ").append(order.getUser().getFullName()).append(",\n\n");
        body.append("Your order has been shipped and is on its way to you.\n\n");
        body.append("Order Number: ").append(order.getOrderNumber()).append("\n");
        body.append("Delivery OTP: ").append(order.getDeliveryOtp()).append("\n\n");
        body.append("Please provide this OTP to the delivery person to verify your delivery.\n\n");
        body.append("Thank you for shopping with us!\n\n");
        body.append("Regards,\nFootwear E-Commerce Team");
        
        message.setText(body.toString());
        emailSender.send(message);
    }

    public void sendReturnRequestNotification(Order order) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo("admin@footwear.com"); // Admin email
        message.setSubject("Return Request - " + order.getOrderNumber());
        
        StringBuilder body = new StringBuilder();
        body.append("A return request has been submitted for order ").append(order.getOrderNumber()).append(".\n\n");
        body.append("Customer: ").append(order.getUser().getFullName()).append("\n");
        body.append("Email: ").append(order.getUser().getEmail()).append("\n");
        body.append("Return Reason: ").append(order.getReturnReason()).append("\n\n");
        body.append("Order Date: ").append(order.getOrderDate()).append("\n");
        body.append("Return Request Date: ").append(order.getReturnRequestDate()).append("\n\n");
        body.append("Please review this return request and take appropriate action.\n\n");
        body.append("Regards,\nFootwear E-Commerce System");
        
        message.setText(body.toString());
        emailSender.send(message);
    }
}
