package com.examly.springapp.model;

import jakarta.persistence.*;

@Entity
public class Turf {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long driverId;

    private String driverName;
    private String licenseNumber;
    private Integer experienceYears;
    private String contactNumber;
    private String availabilityStatus; // e.g., "Available", "Assigned", "On Leave"
    private String address;
    private String vehicleType; // e.g., "Sedan", "SUV", "Bike"
    private Double hourlyRate;

    @Lob
    @Column(name = "image", nullable = true, columnDefinition = "LONGBLOB")
    private String image; // Base64-encoded image of the driver



    // Constructor with parameters
    public Turf(Long driverId, String driverName, String licenseNumber, Integer experienceYears, String contactNumber,
                  String availabilityStatus, String address, String vehicleType, Double hourlyRate, String image) {
        this.driverId = driverId;
        this.driverName = driverName;
        this.licenseNumber = licenseNumber;
        this.experienceYears = experienceYears;
        this.contactNumber = contactNumber;
        this.availabilityStatus = availabilityStatus;
        this.address = address;
        this.vehicleType = vehicleType;
        this.hourlyRate = hourlyRate;
        this.image = image;
    }

    // Default constructor
    public Turf() {
    }

    // Getters and Setters
    public Long getDriverId() {
        return driverId;
    }

    public void setDriverId(Long driverId) {
        this.driverId = driverId;
    }

    public String getDriverName() {
        return driverName;
    }

    public void setDriverName(String driverName) {
        this.driverName = driverName;
    }

    public String getLicenseNumber() {
        return licenseNumber;
    }

    public void setLicenseNumber(String licenseNumber) {
        this.licenseNumber = licenseNumber;
    }

    public Integer getExperienceYears() {
        return experienceYears;
    }

    public void setExperienceYears(Integer experienceYears) {
        this.experienceYears = experienceYears;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getAvailabilityStatus() {
        return availabilityStatus;
    }

    public void setAvailabilityStatus(String availabilityStatus) {
        this.availabilityStatus = availabilityStatus;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
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
