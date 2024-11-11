package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.examly.springapp.exceptions.DuplicateProductException;
import com.examly.springapp.model.Product;
import com.examly.springapp.repository.ProductRepo;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepo productRepo;

    public Product addProduct(Product product) {
        // Check for duplicate product by name
        Optional<Product> existingProduct = productRepo.findByProductName(product.getProductName());
        if (existingProduct.isPresent()) {
            throw new DuplicateProductException("Product with name " + product.getProductName() + " already exists.");
        }
        return productRepo.save(product);
    }

    public Optional<Product> getProductById(Long productId) {
        return productRepo.findById(productId);
    }

    public List<Product> getAllProducts() {
        return productRepo.findAll();
    }

    public Product updateProduct(Long productId, Product updatedProduct) {
        if (productRepo.existsById(productId)) {
            updatedProduct.setProductId(productId);
            return productRepo.save(updatedProduct);
        }
        return null;
    }

    public boolean deleteProduct(Long productId) {
        if (productRepo.existsById(productId)) {
            productRepo.deleteById(productId);
            return true;
        }
        return false;
    }
}
