package com.examly.entity;

public class Book {
    private int bookId;
    private String title;
    private int authorId; 
    private double price;
    private String publishedDate;

    public Book(int bookId, String title, int authorId, double price, String publishedDate) {
        this.bookId = bookId;
        this.title = title;
        this.authorId = authorId;
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

    public int getAuthorId() {
        return authorId;
    }

    public void setAuthorId(int authorId) {
        this.authorId = authorId;
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
