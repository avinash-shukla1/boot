package com.footwear.ecommerce.payload.request;

import lombok.Data;

@Data
public class OrderItemRequest {
    private Long productId;
    private int quantity;
    private String size;
    private String color;
}
