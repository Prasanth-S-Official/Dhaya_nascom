package com.examly.springapp.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class SupportAgent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long agentId;

    private String name; // Agent's name
    private String email; // Agent's email
    private String phone; // Contact number
    private String expertise; // e.g., Networking, Software Support
    private String experience; // e.g., "3 years"
    private String status; // (Available, Unavailable)
    private LocalDate addedDate; // Date when the agent was added by the manager

    @Lob
    @Column(name = "profile", nullable = true, columnDefinition = "LONGBLOB")
    private String profile; // Binary data for storing agent's profile or resume

    private String shiftTiming; // e.g., "9 AM - 6 PM"
    private String remarks; // Additional notes or comments about the agent

    // Constructors
    public SupportAgent(Long agentId, String name, String email, String phone, String expertise,
                        String experience, String status, LocalDate addedDate, String profile,
                        String shiftTiming, String remarks) {
        this.agentId = agentId;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.expertise = expertise;
        this.experience = experience;
        this.status = status;
        this.addedDate = addedDate;
        this.profile = profile;
        this.shiftTiming = shiftTiming;
        this.remarks = remarks;
    }

    public SupportAgent() {
    }

    // Getters and Setters
    public Long getAgentId() {
        return agentId;
    }

    public void setAgentId(Long agentId) {
        this.agentId = agentId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getExpertise() {
        return expertise;
    }

    public void setExpertise(String expertise) {
        this.expertise = expertise;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getAddedDate() {
        return addedDate;
    }

    public void setAddedDate(LocalDate addedDate) {
        this.addedDate = addedDate;
    }

    public String getProfile() {
        return profile;
    }

    public void setProfile(String profile) {
        this.profile = profile;
    }

    public String getShiftTiming() {
        return shiftTiming;
    }

    public void setShiftTiming(String shiftTiming) {
        this.shiftTiming = shiftTiming;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }
}
