package com.examly.springapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;



@Entity
public class PhysicalTraining {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long physicalTrainingId;
    private String trainingName;
    private String description;
    private String trainerName;
    private String location;
    private Boolean isIndoor;
    private Double fee;
    private String focusArea;
    private String physicalRequirements;

    public PhysicalTraining() {
    }

    // Getters and Setters

    public Long getPhysicalTrainingId() {
        return physicalTrainingId;
    }

    public void setPhysicalTrainingId(Long physicalTrainingId) {
        this.physicalTrainingId = physicalTrainingId;
    }

    public String getTrainingName() {
        return trainingName;
    }

    public void setTrainingName(String trainingName) {
        this.trainingName = trainingName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTrainerName() {
        return trainerName;
    }

    public void setTrainerName(String trainerName) {
        this.trainerName = trainerName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Boolean getIsIndoor() {
        return isIndoor;
    }

    public void setIsIndoor(Boolean isIndoor) {
        this.isIndoor = isIndoor;
    }

    public Double getFee() {
        return fee;
    }

    public void setFee(Double fee) {
        this.fee = fee;
    }

    public String getFocusArea() {
        return focusArea;
    }

    public void setFocusArea(String focusArea) {
        this.focusArea = focusArea;
    }

    public String getPhysicalRequirements() {
        return physicalRequirements;
    }

    public void setPhysicalRequirements(String physicalRequirements) {
        this.physicalRequirements = physicalRequirements;
    }
}