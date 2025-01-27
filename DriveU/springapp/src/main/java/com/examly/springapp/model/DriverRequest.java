package com.examly.springapp.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
public class DriverRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long driverRequestId;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "driverId", nullable = true)
    private Turf driver;

    private LocalDate requestDate;
    private String status; // e.g., "Pending", "Approved", "Rejected", "Completed"
    private LocalDate tripDate;
    private LocalTime timeSlot; // Now stores actual time (e.g., 10:30 AM)
    private String pickupLocation;
    private String dropLocation;
    private String estimatedDuration; // e.g., "3 hours", "Full Day"

    @Column(nullable = true) // Allows paymentAmount to be nullable
    private Double paymentAmount;

    private String comments;

    @Column(nullable = true) // Allows actualDropTime to be nullable
    private LocalTime actualDropTime;

    @Column(nullable = true) // Allows actualDropDate to be nullable
    private LocalDate actualDropDate;

    @Column(nullable = true) // Allows actualDuration to be nullable
    private String actualDuration;

    // Constructor with parameters
    public DriverRequest(Long driverRequestId, User user, Turf driver, LocalDate requestDate, String status,
                         LocalDate tripDate, LocalTime timeSlot, String pickupLocation, String dropLocation,
                         String estimatedDuration, Double paymentAmount, String comments,
                         LocalTime actualDropTime, LocalDate actualDropDate, String actualDuration) {
        this.driverRequestId = driverRequestId;
        this.user = user;
        this.driver = driver;
        this.requestDate = requestDate;
        this.status = status;
        this.tripDate = tripDate;
        this.timeSlot = timeSlot;
        this.pickupLocation = pickupLocation;
        this.dropLocation = dropLocation;
        this.estimatedDuration = estimatedDuration;
        this.paymentAmount = paymentAmount;
        this.comments = comments;
        this.actualDropTime = actualDropTime;
        this.actualDropDate = actualDropDate;
        this.actualDuration = actualDuration;
    }

    // Default constructor
    public DriverRequest() {
    }

    // Getters and Setters
    public Long getDriverRequestId() {
        return driverRequestId;
    }

    public void setDriverRequestId(Long driverRequestId) {
        this.driverRequestId = driverRequestId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Turf getDriver() {
        return driver;
    }

    public void setDriver(Turf driver) {
        this.driver = driver;
    }

    public LocalDate getRequestDate() {
        return requestDate;
    }

    public void setRequestDate(LocalDate requestDate) {
        this.requestDate = requestDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getTripDate() {
        return tripDate;
    }

    public void setTripDate(LocalDate tripDate) {
        this.tripDate = tripDate;
    }

    public LocalTime getTimeSlot() {
        return timeSlot;
    }

    public void setTimeSlot(LocalTime timeSlot) {
        this.timeSlot = timeSlot;
    }

    public String getPickupLocation() {
        return pickupLocation;
    }

    public void setPickupLocation(String pickupLocation) {
        this.pickupLocation = pickupLocation;
    }

    public String getDropLocation() {
        return dropLocation;
    }

    public void setDropLocation(String dropLocation) {
        this.dropLocation = dropLocation;
    }

    public String getEstimatedDuration() {
        return estimatedDuration;
    }

    public void setEstimatedDuration(String estimatedDuration) {
        this.estimatedDuration = estimatedDuration;
    }

    public Double getPaymentAmount() {
        return paymentAmount;
    }

    public void setPaymentAmount(Double paymentAmount) {
        this.paymentAmount = paymentAmount;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public LocalTime getActualDropTime() {
        return actualDropTime;
    }

    public void setActualDropTime(LocalTime actualDropTime) {
        this.actualDropTime = actualDropTime;
    }

    public LocalDate getActualDropDate() {
        return actualDropDate;
    }

    public void setActualDropDate(LocalDate actualDropDate) {
        this.actualDropDate = actualDropDate;
    }

    public String getActualDuration() {
        return actualDuration;
    }

    public void setActualDuration(String actualDuration) {
        this.actualDuration = actualDuration;
    }
}
