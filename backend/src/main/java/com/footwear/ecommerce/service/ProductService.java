package com.footwear.ecommerce.service;

import com.footwear.ecommerce.model.Product;
import com.footwear.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    public List<Product> getProductsByCategory(Product.Category category) {
        return productRepository.findByCategory(category);
    }

    public List<Product> getFeaturedProducts() {
        return productRepository.findByFeatured(true);
    }

    public List<Product> searchProducts(String query) {
        return productRepository.findByNameContainingIgnoreCase(query);
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product productDetails) {
        Product product = getProductById(id);
        
        product.setName(productDetails.getName());
        product.setDescription(productDetails.getDescription());
        product.setPrice(productDetails.getPrice());
        product.setStockQuantity(productDetails.getStockQuantity());
        product.setCategory(productDetails.getCategory());
        product.setAvailableSizes(productDetails.getAvailableSizes());
        product.setAvailableColors(productDetails.getAvailableColors());
        product.setBrand(productDetails.getBrand());
        product.setFeatured(productDetails.isFeatured());
        
        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        Product product = getProductById(id);
        productRepository.delete(product);
    }

    public Product uploadProductImages(Long id, List<MultipartFile> files) {
        Product product = getProductById(id);
        List<String> imageUrls = new ArrayList<>();
        
        try {
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            
            for (MultipartFile file : files) {
                String filename = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
                Path filePath = uploadPath.resolve(filename);
                Files.copy(file.getInputStream(), filePath);
                
                String imageUrl = "/images/" + filename;
                imageUrls.add(imageUrl);
            }
            
            product.setImageUrls(imageUrls);
            return productRepository.save(product);
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload images: " + e.getMessage());
        }
    }
}
