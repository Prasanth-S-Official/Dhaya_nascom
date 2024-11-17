package com.examly.springapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDate;

import jakarta.persistence.Column;

@Entity
public class BookRentalRequest {

     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookRentalRequestId;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne
    @JoinColumn(name = "bookId")
    private Book book;

    private LocalDate requestDate;
    private LocalDate returnDate;
    private String status; // Pending/Approved/Rejected/Returned
    private String comments;

    
    public BookRentalRequest(){

    }
    
    public BookRentalRequest(Long bookRentalRequestId, User user, Book book, LocalDate requestDate,
            LocalDate returnDate, String status, String comments) {
        this.bookRentalRequestId = bookRentalRequestId;
        this.user = user;
        this.book = book;
        this.requestDate = requestDate;
        this.returnDate = returnDate;
        this.status = status;
        this.comments = comments;
    }
    public Long getBookRentalRequestId() {
        return bookRentalRequestId;
    }
    public void setBookRentalRequestId(Long bookRentalRequestId) {
        this.bookRentalRequestId = bookRentalRequestId;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
    public Book getBook() {
        return book;
    }
    public void setBook(Book book) {
        this.book = book;
    }
    public LocalDate getRequestDate() {
        return requestDate;
    }
    public void setRequestDate(LocalDate requestDate) {
        this.requestDate = requestDate;
    }
    public LocalDate getReturnDate() {
        return returnDate;
    }
    public void setReturnDate(LocalDate returnDate) {
        this.returnDate = returnDate;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public String getComments() {
        return comments;
    }
    public void setComments(String comments) {
        this.comments = comments;
    }
    
    
}
