package com.examly.springapp.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long projectId;

    private String title;
    private String description;

    private Double budget;

    private LocalDate deadline;

    private String status; // "Open", "Closed", "Completed"

    private String category; // e.g., "Web Development", "Graphic Design"

    private String skillsRequired; // List of skills, e.g., "Python", "Design"

    @Column(length = 1000)
    private String attachments; // File URLs or paths for reference materials

    private String priority; // e.g., "High", "Medium", "Low"

    private String paymentTerms; // e.g., "Milestone-based", "Hourly Rate", "Fixed Price"

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user; // The client who created the project

    // Constructor with parameters
    public Project(Long projectId, String title, String description, Double budget, LocalDate deadline,
                   String status, String category, String skillsRequired, String attachments,
                   String priority, String paymentTerms, User user) {
        this.projectId = projectId;
        this.title = title;
        this.description = description;
        this.budget = budget;
        this.deadline = deadline;
        this.status = status;
        this.category = category;
        this.skillsRequired = skillsRequired;
        this.attachments = attachments;
        this.priority = priority;
        this.paymentTerms = paymentTerms;
        this.user = user;
    }

    // Default constructor
    public Project() {
    }

    // Getters and Setters
    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
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

    public Double getBudget() {
        return budget;
    }

    public void setBudget(Double budget) {
        this.budget = budget;
    }

    public LocalDate getDeadline() {
        return deadline;
    }

    public void setDeadline(LocalDate deadline) {
        this.deadline = deadline;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getSkillsRequired() {
        return skillsRequired;
    }

    public void setSkillsRequired(String skillsRequired) {
        this.skillsRequired = skillsRequired;
    }

    public String getAttachments() {
        return attachments;
    }

    public void setAttachments(String attachments) {
        this.attachments = attachments;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getPaymentTerms() {
        return paymentTerms;
    }

    public void setPaymentTerms(String paymentTerms) {
        this.paymentTerms = paymentTerms;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
