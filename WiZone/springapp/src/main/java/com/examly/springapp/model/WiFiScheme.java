package com.examly.springapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class WiFiScheme {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long wifiSchemeId;

    private String schemeName;
    private String description;
    private String region;
    private String speed;
    private String dataLimit;
    private Double fee;

    // New attributes for real-time availability
    private String availabilityStatus; // "Available" or "Unavailable"

    public WiFiScheme(Long wifiSchemeId, String schemeName, String description, String region, String speed,
            String dataLimit, Double fee, String availabilityStatus) {
        this.wifiSchemeId = wifiSchemeId;
        this.schemeName = schemeName;
        this.description = description;
        this.region = region;
        this.speed = speed;
        this.dataLimit = dataLimit;
        this.fee = fee;
        this.availabilityStatus = availabilityStatus;
    }

    // Constructor
    public WiFiScheme() {
    }

    // Getters and Setters

    public Long getWifiSchemeId() {
        return wifiSchemeId;
    }

    public void setWifiSchemeId(Long wifiSchemeId) {
        this.wifiSchemeId = wifiSchemeId;
    }

    public String getSchemeName() {
        return schemeName;
    }

    public void setSchemeName(String schemeName) {
        this.schemeName = schemeName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getSpeed() {
        return speed;
    }

    public void setSpeed(String speed) {
        this.speed = speed;
    }

    public String getDataLimit() {
        return dataLimit;
    }

    public void setDataLimit(String dataLimit) {
        this.dataLimit = dataLimit;
    }

    public Double getFee() {
        return fee;
    }

    public void setFee(Double fee) {
        this.fee = fee;
    }

    public String getAvailabilityStatus() {
        return availabilityStatus;
    }

    public void setAvailabilityStatus(String availabilityStatus) {
        this.availabilityStatus = availabilityStatus;
    }

}
