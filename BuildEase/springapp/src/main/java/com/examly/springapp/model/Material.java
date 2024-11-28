package com.examly.springapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Material {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long materialId;

    private String materialName;
    private String description;
    private String category; // e.g., "Cement", "Metal", "Wood"
    private Double pricePerUnit;
    private String unitType; // e.g., "kg", "ton", "piece"
    private String availabilityStatus; // "In Stock" or "Out of Stock"

    // Constructor with parameters
    public Material(Long materialId, String materialName, String description, String category, 
                    Double pricePerUnit, String unitType, String availabilityStatus) {
        this.materialId = materialId;
        this.materialName = materialName;
        this.description = description;
        this.category = category;
        this.pricePerUnit = pricePerUnit;
        this.unitType = unitType;
        this.availabilityStatus = availabilityStatus;
    }

    // Default constructor
    public Material() {
    }

    // Getters and Setters
    public Long getMaterialId() {
        return materialId;
    }

    public void setMaterialId(Long materialId) {
        this.materialId = materialId;
    }

    public String getMaterialName() {
        return materialName;
    }

    public void setMaterialName(String materialName) {
        this.materialName = materialName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Double getPricePerUnit() {
        return pricePerUnit;
    }

    public void setPricePerUnit(Double pricePerUnit) {
        this.pricePerUnit = pricePerUnit;
    }

    public String getUnitType() {
        return unitType;
    }

    public void setUnitType(String unitType) {
        this.unitType = unitType;
    }

    public String getAvailabilityStatus() {
        return availabilityStatus;
    }

    public void setAvailabilityStatus(String availabilityStatus) {
        this.availabilityStatus = availabilityStatus;
    }
}
