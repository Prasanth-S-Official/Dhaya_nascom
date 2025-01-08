package com.examly.springapp.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long feedbackId;

    private String feedbackText; // Textual feedback provided by the user
    private LocalDate date; // Date when the feedback was submitted

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user; // The user providing feedback

    @ManyToOne
    @JoinColumn(name = "projectId", nullable = true)
    private Project project; // The project being reviewed (nullable)

    @ManyToOne
    @JoinColumn(name = "bidId", nullable = true)
    private Bid bid; // Associated bid for which the feedback is given (optional)

    private String category; // Category of feedback, e.g., "Communication", "Work Quality"
    
    private Integer rating; // Rating out of 5 (nullable)

    // Default constructor
    public Feedback() {
        this.rating = null; // Ensures default rating is null
    }

    // Parameterized constructor
    public Feedback(Long feedbackId, String feedbackText, LocalDate date, User user, Project project, Bid bid, 
                    String category, Integer rating) {
        this.feedbackId = feedbackId;
        this.feedbackText = feedbackText;
        this.date = date;
        this.user = user;
        this.project = project;
        this.bid = bid;
        this.category = category;
        this.rating = rating;
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

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public Bid getBid() {
        return bid;
    }

    public void setBid(Bid bid) {
        this.bid = bid;
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
