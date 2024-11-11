package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;
import com.examly.springapp.model.Product;

public interface ProductService {
    Product addProduct(Product product);
    Optional<Product> getProductById(Long productId);
    List<Product> getAllProducts();
    Product updateProduct(Long productId, Product product);
    boolean deleteProduct(Long productId);
}
