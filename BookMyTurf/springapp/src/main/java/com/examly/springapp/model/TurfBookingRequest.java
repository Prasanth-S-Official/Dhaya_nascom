package com.examly.springapp.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
public class TurfBookingRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingRequestId;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "turfId", nullable = false)
    private Turf turf;

    private LocalDate bookingDate;
    private String status; 
    private LocalDate eventDate;
    private LocalTime timeSlot; // e.g., "10:00 AM - 12:00 PM"
    private String comments;

    @Column(nullable = true) 
    private Double totalCost;

    // New attributes for extended time requests
    @Column(nullable = true) // Allows null initially
    private Boolean extendingTimeRequest; // True if user requests extended time

    @Column(nullable = true) // Allows null initially
    private String extraTimeNeeded; // e.g., "1 hour", "30 minutes"

    @Column(nullable = true) // Allows null initially
    private Boolean extendedTimeApproved; // True if extended time is approved by admin

    @Column(nullable = true) // Allows null initially
    private Double extraTimeCost; // Cost for the extra time requested

    // Constructor with parameters
    public TurfBookingRequest(Long bookingRequestId, User user, Turf turf, LocalDate bookingDate, String status,
                              LocalDate eventDate, LocalTime timeSlot, String comments, Double totalCost,
                              Boolean extendingTimeRequest, String extraTimeNeeded, Boolean extendedTimeApproved,
                              Double extraTimeCost) {
        this.bookingRequestId = bookingRequestId;
        this.user = user;
        this.turf = turf;
        this.bookingDate = bookingDate;
        this.status = status;
        this.eventDate = eventDate;
        this.timeSlot = timeSlot;
        this.comments = comments;
        this.totalCost = totalCost;
        this.extendingTimeRequest = extendingTimeRequest;
        this.extraTimeNeeded = extraTimeNeeded;
        this.extendedTimeApproved = extendedTimeApproved;
        this.extraTimeCost = extraTimeCost;
    }

    // Default constructor
    public TurfBookingRequest() {
    }

    // Getters and Setters
    public Long getBookingRequestId() {
        return bookingRequestId;
    }

    public void setBookingRequestId(Long bookingRequestId) {
        this.bookingRequestId = bookingRequestId;
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

    public LocalDate getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(LocalDate bookingDate) {
        this.bookingDate = bookingDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getEventDate() {
        return eventDate;
    }

    public void setEventDate(LocalDate eventDate) {
        this.eventDate = eventDate;
    }

    public LocalTime getTimeSlot() {
        return timeSlot;
    }

    public void setTimeSlot(LocalTime timeSlot) {
        this.timeSlot = timeSlot;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public Double getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(Double totalCost) {
        this.totalCost = totalCost;
    }

    public Boolean getExtendingTimeRequest() {
        return extendingTimeRequest;
    }

    public void setExtendingTimeRequest(Boolean extendingTimeRequest) {
        this.extendingTimeRequest = extendingTimeRequest;
    }

    public String getExtraTimeNeeded() {
        return extraTimeNeeded;
    }

    public void setExtraTimeNeeded(String extraTimeNeeded) {
        this.extraTimeNeeded = extraTimeNeeded;
    }

    public Boolean getExtendedTimeApproved() {
        return extendedTimeApproved;
    }

    public void setExtendedTimeApproved(Boolean extendedTimeApproved) {
        this.extendedTimeApproved = extendedTimeApproved;
    }

    public Double getExtraTimeCost() {
        return extraTimeCost;
    }

    public void setExtraTimeCost(Double extraTimeCost) {
        this.extraTimeCost = extraTimeCost;
    }
}
