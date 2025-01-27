package com.examly.springapp.model;

import jakarta.persistence.*;

@Entity
public class Turf {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long turfId;

    private String turfName;
    private String location;
    private String turfType; // e.g., "Football", "Cricket", "Badminton"
    private Integer capacity; // Number of players it can accommodate
    private String availabilityStatus; // e.g., "Available", "Booked", "Under Maintenance"
    private Double hourlyRate;

    @Lob
    @Column(name = "image", nullable = true, columnDefinition = "LONGBLOB")
    private String image; // Base64-encoded image of the turf

    // Constructor with parameters
    public Turf(Long turfId, String turfName, String location, String turfType, Integer capacity, String availabilityStatus, Double hourlyRate, String image) {
        this.turfId = turfId;
        this.turfName = turfName;
        this.location = location;
        this.turfType = turfType;
        this.capacity = capacity;
        this.availabilityStatus = availabilityStatus;
        this.hourlyRate = hourlyRate;
        this.image = image;
    }

    // Default constructor
    public Turf() {
    }

    // Getters and Setters
    public Long getTurfId() {
        return turfId;
    }

    public void setTurfId(Long turfId) {
        this.turfId = turfId;
    }

    public String getTurfName() {
        return turfName;
    }

    public void setTurfName(String turfName) {
        this.turfName = turfName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getTurfType() {
        return turfType;
    }

    public void setTurfType(String turfType) {
        this.turfType = turfType;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public String getAvailabilityStatus() {
        return availabilityStatus;
    }

    public void setAvailabilityStatus(String availabilityStatus) {
        this.availabilityStatus = availabilityStatus;
    }

    public Double getHourlyRate() {
        return hourlyRate;
    }

    public void setHourlyRate(Double hourlyRate) {
        this.hourlyRate = hourlyRate;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
