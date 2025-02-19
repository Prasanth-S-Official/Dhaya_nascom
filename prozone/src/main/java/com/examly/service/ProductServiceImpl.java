package com.examly.service;

import com.examly.entity.Product;
import com.examly.util.DBConnectionUtil;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ProductServiceImpl implements ProductService {

    private Connection connection;

    public ProductServiceImpl() {
        connection = DBConnectionUtil.getConnection();
    }

    @Override
    public String addProduct(Product product) {
        if (product.getName() == null || product.getName().isEmpty()) {
            return "Error: Product name cannot be empty.";
        }
        if (product.getCategoryName() == null || product.getCategoryName().isEmpty()) {
            return "Error: Category name cannot be empty.";
        }
        if (product.getPrice() <= 0) {
            return "Error: Price must be greater than zero.";
        }
        if (product.getStockQuantity() < 0) {
            return "Error: Stock quantity cannot be negative.";
        }

        String query = "INSERT INTO products (name, categoryName, price, stockQuantity) VALUES (?, ?, ?, ?)";
        try (PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setString(1, product.getName());
            statement.setString(2, product.getCategoryName());
            statement.setDouble(3, product.getPrice());
            statement.setInt(4, product.getStockQuantity());

            int rowsInserted = statement.executeUpdate();
            return (rowsInserted > 0) ? "Product added successfully!" : "Error: Failed to add product.";
        } catch (SQLException e) {
            return "Database error: " + e.getMessage();
        }
    }

    @Override
    public String updateProduct(Product product) {
        if (product.getCategoryName() == null || product.getCategoryName().isEmpty()) {
            return "Error: Category name cannot be empty.";
        }

        String query = "UPDATE products SET name = ?, categoryName = ?, price = ?, stockQuantity = ? WHERE productId = ?";
        try (PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setString(1, product.getName());
            statement.setString(2, product.getCategoryName());
            statement.setDouble(3, product.getPrice());
            statement.setInt(4, product.getStockQuantity());
            statement.setInt(5, product.getProductId());

            int rowsUpdated = statement.executeUpdate();
            return (rowsUpdated > 0) ? "Product updated successfully!" : "Error: No product found with ID: " + product.getProductId();
        } catch (SQLException e) {
            return "Database error: " + e.getMessage();
        }
    }

    @Override
    public String deleteProduct(int productId) {
        String query = "DELETE FROM products WHERE productId = ?";
        try (PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setInt(1, productId);
            int rowsDeleted = statement.executeUpdate();
            return (rowsDeleted > 0) ? "Product deleted successfully!" : "Error: No product found with ID: " + productId;
        } catch (SQLException e) {
            return "Database error: " + e.getMessage();
        }
    }

    @Override
    public Product getProductById(int productId) {
        String query = "SELECT * FROM products WHERE productId = ?";
        try (PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setInt(1, productId);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return new Product(
                        resultSet.getInt("productId"),
                        resultSet.getString("name"),
                        resultSet.getString("categoryName"),
                        resultSet.getDouble("price"),
                        resultSet.getInt("stockQuantity")
                    );
                }
            }
        } catch (SQLException e) {
            System.err.println("Error retrieving product: " + e.getMessage());
        }
        return null;
    }

    @Override
    public List<Product> getAllProducts() {
        List<Product> products = new ArrayList<>();
        String query = "SELECT * FROM products";
        try (PreparedStatement statement = connection.prepareStatement(query);
             ResultSet resultSet = statement.executeQuery()) {
            while (resultSet.next()) {
                products.add(new Product(
                    resultSet.getInt("productId"),
                    resultSet.getString("name"),
                    resultSet.getString("categoryName"),
                    resultSet.getDouble("price"),
                    resultSet.getInt("stockQuantity")
                ));
            }
        } catch (SQLException e) {
            System.err.println("Error retrieving products: " + e.getMessage());
        }
        return products;
    }

    @Override
    public List<Product> searchByName(String name) {
        List<Product> products = new ArrayList<>();
        String query = "SELECT * FROM products WHERE name LIKE ?";
        try (PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setString(1, "%" + name + "%");
            try (ResultSet resultSet = statement.executeQuery()) {
                while (resultSet.next()) {
                    products.add(new Product(
                        resultSet.getInt("productId"),
                        resultSet.getString("name"),
                        resultSet.getString("categoryName"),
                        resultSet.getDouble("price"),
                        resultSet.getInt("stockQuantity")
                    ));
                }
            }
        } catch (SQLException e) {
            System.err.println("Error retrieving products by name: " + e.getMessage());
        }
        return products;
    }

    @Override
    public List<Product> filterByCategory(String categoryName) {
        List<Product> products = new ArrayList<>();
        String query = "SELECT * FROM products WHERE categoryName = ?";
        try (PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setString(1, categoryName);
            try (ResultSet resultSet = statement.executeQuery()) {
                while (resultSet.next()) {
                    products.add(new Product(
                        resultSet.getInt("productId"),
                        resultSet.getString("name"),
                        resultSet.getString("categoryName"),
                        resultSet.getDouble("price"),
                        resultSet.getInt("stockQuantity")
                    ));
                }
            }
        } catch (SQLException e) {
            System.err.println("Error retrieving products by category: " + e.getMessage());
        }
        return products;
    }
}
