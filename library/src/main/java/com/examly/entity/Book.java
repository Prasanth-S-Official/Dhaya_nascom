package com.examly.entity;

public class Book {
    private int bookId;
    private String title;
    private String authorName; // Storing author as a string instead of a separate entity
    private double price;
    private String publishedDate;

    public Book(int bookId, String title, String authorName, double price, String publishedDate) {
        this.bookId = bookId;
        this.title = title;
        this.authorName = authorName;
        this.price = price;
        this.publishedDate = publishedDate;
    }

    public Book() {}

    // Getters and Setters
    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getPublishedDate() {
        return publishedDate;
    }

    public void setPublishedDate(String publishedDate) {
        this.publishedDate = publishedDate;
    }
}
