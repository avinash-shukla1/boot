package com.footwear.ecommerce.payload.request;

import com.footwear.ecommerce.model.Order;
import lombok.Data;

import java.util.List;

@Data
public class OrderRequest {
    private Long shippingAddressId;
    private Order.PaymentMethod paymentMethod;
    private String paymentId;
    private List<OrderItemRequest> items;
}
