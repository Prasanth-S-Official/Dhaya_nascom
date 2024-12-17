package com.examly.springapp.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Requirement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long requirementId;

    private String title; // Requirement title
    private String description; // Detailed description
    private String department; // e.g., "IT", "Finance"
    private LocalDate postedDate; // Date when the requirement was posted
    private String status; // e.g., "Open", "Closed"

    private String duration; // e.g., "4 weeks", "2 months"
    private String mode; // e.g., "Online", "Offline"
    private String location; // e.g., "New York", "Remote"
    private String skillLevel; // e.g., "Beginner", "Intermediate", "Advanced"
    private Double budget; // e.g., 5000.0
    private String priority; // e.g., "High", "Medium", "Low"

    @ManyToOne
    @JoinColumn(name = "trainer_id", nullable = true)
    private Trainer trainer; // Link to Trainer

    // Constructors
    public Requirement(Long requirementId, String title, String description, String department,
                       LocalDate postedDate, String status, String duration, String mode,
                       String location, String skillLevel, Double budget, String priority, Trainer trainer) {
        this.requirementId = requirementId;
        this.title = title;
        this.description = description;
        this.department = department;
        this.postedDate = postedDate;
        this.status = status;
        this.duration = duration;
        this.mode = mode;
        this.location = location;
        this.skillLevel = skillLevel;
        this.budget = budget;
        this.priority = priority;
        this.trainer = trainer;
    }

    public Requirement() {
    }

    // Getters and Setters
    public Long getRequirementId() {
        return requirementId;
    }

    public void setRequirementId(Long requirementId) {
        this.requirementId = requirementId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public LocalDate getPostedDate() {
        return postedDate;
    }

    public void setPostedDate(LocalDate postedDate) {
        this.postedDate = postedDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getMode() {
        return mode;
    }

    public void setMode(String mode) {
        this.mode = mode;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getSkillLevel() {
        return skillLevel;
    }

    public void setSkillLevel(String skillLevel) {
        this.skillLevel = skillLevel;
    }

    public Double getBudget() {
        return budget;
    }

    public void setBudget(Double budget) {
        this.budget = budget;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public Trainer getTrainer() {
        return trainer;
    }

    public void setTrainer(Trainer trainer) {
        this.trainer = trainer;
    }
}
