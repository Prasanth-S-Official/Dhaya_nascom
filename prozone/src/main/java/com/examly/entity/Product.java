package com.examly.entity;

public class Product {
    private int productId;
    private String name;
    private String categoryName; // Storing category as a string instead of using a separate entity
    private double price;
    private int stockQuantity;

    public Product(int productId, String name, String categoryName, double price, int stockQuantity) {
        this.productId = productId;
        this.name = name;
        this.categoryName = categoryName;
        this.price = price;
        this.stockQuantity = stockQuantity;
    }

    public Product() {}

    // Getters and Setters
    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(int stockQuantity) {
        this.stockQuantity = stockQuantity;
    }
}
