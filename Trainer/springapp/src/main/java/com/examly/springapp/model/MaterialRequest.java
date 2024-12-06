package com.examly.springapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Column;
import java.time.LocalDate;

@Entity
public class MaterialRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long materialRequestId;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user; // Reference to the user making the request

    @ManyToOne
    @JoinColumn(name = "materialId", nullable = false)
    private Material material; // Reference to the requested material

    @Column(nullable = false)
    private Double quantity; // Quantity of material requested

    @Column(nullable = false)
    private String urgencyLevel; // "Low", "Medium", or "High"

    @Column(nullable = false)
    private LocalDate requestDate; // Date of the request

    @Column(nullable = false)
    private LocalDate preferredDeliveryDate; // Preferred delivery date

    @Column(nullable = false)
    private String timeSlot; // Preferred time slot for delivery (e.g., "Morning", "Afternoon", "Evening")

    @Column(nullable = false)
    private String status; // "Pending", "Approved", or "Rejected"

    // Address details
    @Column(nullable = false)
    private String deliveryAddress; // Full address for material delivery

    @Column(nullable = false)
    private String contactNumber; // Contact number for delivery communication

    private String comments; // Optional comments or special instructions

    // Constructor
    public MaterialRequest() {
    }

    // Getters and Setters
    public Long getMaterialRequestId() {
        return materialRequestId;
    }

    public void setMaterialRequestId(Long materialRequestId) {
        this.materialRequestId = materialRequestId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Material getMaterial() {
        return material;
    }

    public void setMaterial(Material material) {
        this.material = material;
    }

    public Double getQuantity() {
        return quantity;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }

    public String getUrgencyLevel() {
        return urgencyLevel;
    }

    public void setUrgencyLevel(String urgencyLevel) {
        this.urgencyLevel = urgencyLevel;
    }

    public LocalDate getRequestDate() {
        return requestDate;
    }

    public void setRequestDate(LocalDate requestDate) {
        this.requestDate = requestDate;
    }

    public LocalDate getPreferredDeliveryDate() {
        return preferredDeliveryDate;
    }

    public void setPreferredDeliveryDate(LocalDate preferredDeliveryDate) {
        this.preferredDeliveryDate = preferredDeliveryDate;
    }

    public String getTimeSlot() {
        return timeSlot;
    }

    public void setTimeSlot(String timeSlot) {
        this.timeSlot = timeSlot;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDeliveryAddress() {
        return deliveryAddress;
    }

    public void setDeliveryAddress(String deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }
}
