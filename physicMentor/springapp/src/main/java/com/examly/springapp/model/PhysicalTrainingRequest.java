package com.examly.springapp.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
public class PhysicalTrainingRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long physicalTrainingRequestId;

    @NotNull(message = "User ID is required")
    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @NotNull(message = "Physical Training ID is required")
    @ManyToOne
    @JoinColumn(name = "physicalTrainingId")
    private PhysicalTraining physicalTraining;

    @NotNull(message = "Request date is required")
    private LocalDate requestDate;

    @NotBlank(message = "Status is required")
    private String status;

    @NotBlank(message = "Health conditions are required")
    private String healthConditions;

    @NotBlank(message = "Fitness goals are required")
    private String fitnessGoals;

    private String comments;

    public PhysicalTrainingRequest() {
    }

    // Getters and Setters

    public Long getPhysicalTrainingRequestId() {
        return physicalTrainingRequestId;
    }

    public void setPhysicalTrainingRequestId(Long physicalTrainingRequestId) {
        this.physicalTrainingRequestId = physicalTrainingRequestId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public PhysicalTraining getPhysicalTraining() {
        return physicalTraining;
    }

    public void setPhysicalTraining(PhysicalTraining physicalTraining) {
        this.physicalTraining = physicalTraining;
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

    public String getHealthConditions() {
        return healthConditions;
    }

    public void setHealthConditions(String healthConditions) {
        this.healthConditions = healthConditions;
    }

    public String getFitnessGoals() {
        return fitnessGoals;
    }

    public void setFitnessGoals(String fitnessGoals) {
        this.fitnessGoals = fitnessGoals;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }
}
