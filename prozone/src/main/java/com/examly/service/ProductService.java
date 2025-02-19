package com.examly.service;

import com.examly.entity.Product;
import java.util.List;

public interface ProductService {
    String addProduct(Product product);
    String updateProduct(Product product);
    String deleteProduct(int productId);
    Product getProductById(int productId);
    List<Product> getAllProducts();
    List<Product> searchByName(String name);
    List<Product> filterByCategory(String categoryName);
}
