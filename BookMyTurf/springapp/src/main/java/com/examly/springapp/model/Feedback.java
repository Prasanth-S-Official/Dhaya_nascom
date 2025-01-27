package com.examly.springapp.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long feedbackId;

    private String feedbackText;
    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user; // Relation to the User entity

    @ManyToOne
    @JoinColumn(name = "turfId", nullable = true)
    private Turf turf; // Relation to the Turf entity, can be nullable

    @ManyToOne
    @JoinColumn(name = "bookingRequestId", nullable = true)
    private TurfBookingRequest turfBookingRequest; // Relation to the TurfBookingRequest entity, can be nullable

    private String category; // e.g., "Turf Quality", "Service Experience"
    private Integer rating; // Rating from 1 to 5

    // Constructor with parameters
    public Feedback(Long feedbackId, String feedbackText, LocalDate date, User user, Turf turf, 
                    TurfBookingRequest turfBookingRequest, String category, Integer rating) {
        this.feedbackId = feedbackId;
        this.feedbackText = feedbackText;
        this.date = date;
        this.user = user;
        this.turf = turf;
        this.turfBookingRequest = turfBookingRequest;
        this.category = category;
        this.rating = rating;
    }

    // Default constructor
    public Feedback() {
    }

    // Getters and Setters
    public Long getFeedbackId() {
        return feedbackId;
    }

    public void setFeedbackId(Long feedbackId) {
        this.feedbackId = feedbackId;
    }

    public String getFeedbackText() {
        return feedbackText;
    }

    public void setFeedbackText(String feedbackText) {
        this.feedbackText = feedbackText;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Turf getTurf() {
        return turf;
    }

    public void setTurf(Turf turf) {
        this.turf = turf;
    }

    public TurfBookingRequest getTurfBookingRequest() {
        return turfBookingRequest;
    }

    public void setTurfBookingRequest(TurfBookingRequest turfBookingRequest) {
        this.turfBookingRequest = turfBookingRequest;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }
}
