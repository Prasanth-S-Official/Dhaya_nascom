package com.examly.springapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Column;
import jakarta.persistence.Lob;
import java.time.LocalDate;

@Entity
public class WiFiSchemeRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long wifiSchemeRequestId;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user; // Reference to the user making the request

    @ManyToOne
    @JoinColumn(name = "wifiSchemeId", nullable = false)
    private WiFiScheme wifiScheme; // Reference to the Wi-Fi scheme

    @Column(nullable = false)
    private LocalDate requestDate; // Date of the request

    @Column(nullable = false)
    private String status; // "Pending", "Approved", or "Rejected"

    private String comments; // Optional comments provided by the user

    @Lob
    @Column(name = "proof", nullable = false, columnDefinition = "LONGBLOB")
    private String proof; // Proof document uploaded by the user (base64 encoded)

    // Split address fields
    @Column(nullable = false)
    private String streetName; // Street name for the service setup

    @Column(nullable = false)
    private String landmark; // Nearby landmark for easier location identification

    @Column(nullable = false)
    private String city; // City for the Wi-Fi service setup

    @Column(nullable = false)
    private String state; // State for the Wi-Fi service setup

    @Column(nullable = false)
    private String zipCode; // ZIP/Postal code for the location

    @Column(nullable = false)
    private LocalDate preferredSetupDate; // Preferred date for Wi-Fi setup

    @Column(nullable = false)
    private String timeSlot; // Preferred time slot for Wi-Fi setup

    // Constructor
    public WiFiSchemeRequest() {
    }

    // Getters and Setters
    public Long getWifiSchemeRequestId() {
        return wifiSchemeRequestId;
    }

    public void setWifiSchemeRequestId(Long wifiSchemeRequestId) {
        this.wifiSchemeRequestId = wifiSchemeRequestId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public WiFiScheme getWifiScheme() {
        return wifiScheme;
    }

    public void setWifiScheme(WiFiScheme wifiScheme) {
        this.wifiScheme = wifiScheme;
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

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public String getProof() {
        return proof;
    }

    public void setProof(String proof) {
        this.proof = proof;
    }

    public String getStreetName() {
        return streetName;
    }

    public void setStreetName(String streetName) {
        this.streetName = streetName;
    }

    public String getLandmark() {
        return landmark;
    }

    public void setLandmark(String landmark) {
        this.landmark = landmark;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public LocalDate getPreferredSetupDate() {
        return preferredSetupDate;
    }

    public void setPreferredSetupDate(LocalDate preferredSetupDate) {
        this.preferredSetupDate = preferredSetupDate;
    }

    public String getTimeSlot() {
        return timeSlot;
    }

    public void setTimeSlot(String timeSlot) {
        this.timeSlot = timeSlot;
    }
}
