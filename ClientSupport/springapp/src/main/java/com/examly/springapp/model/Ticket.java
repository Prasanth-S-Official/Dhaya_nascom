package com.examly.springapp.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ticketId;

    private String title; // Ticket title
    private String description; // Detailed description of the issue
    private String priority; // e.g., "High", "Medium", "Low"
    private String status; // e.g., "Open", "In Progress", "Resolved", "Closed"
    private LocalDate createdDate; // Date when the ticket was created
    private LocalDate resolutionDate; // Expected/actual resolution date
    private String issueCategory; // e.g., "Technical", "Billing", "General"
    private String severity; // e.g., "Critical", "Major", "Minor"

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // Link to the client who raised the ticket

    @ManyToOne
    @JoinColumn(name = "support_agent_id", nullable = true)
    private SupportAgent supportAgent; // Assigned agent for resolution

    public Ticket(){

    }


    public Ticket(Long ticketId, String title, String description, String priority, String status,
            LocalDate createdDate, LocalDate resolutionDate, String issueCategory, String severity, User user,
            SupportAgent supportAgent) {
        this.ticketId = ticketId;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.status = status;
        this.createdDate = createdDate;
        this.resolutionDate = resolutionDate;
        this.issueCategory = issueCategory;
        this.severity = severity;
        this.user = user;
        this.supportAgent = supportAgent;
    }



    public Long getTicketId() {
        return ticketId;
    }

    public void setTicketId(Long ticketId) {
        this.ticketId = ticketId;
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

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }

    public LocalDate getResolutionDate() {
        return resolutionDate;
    }

    public void setResolutionDate(LocalDate resolutionDate) {
        this.resolutionDate = resolutionDate;
    }

    public String getIssueCategory() {
        return issueCategory;
    }

    public void setIssueCategory(String issueCategory) {
        this.issueCategory = issueCategory;
    }

    public String getSeverity() {
        return severity;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public SupportAgent getSupportAgent() {
        return supportAgent;
    }

    public void setSupportAgent(SupportAgent supportAgent) {
        this.supportAgent = supportAgent;
    }



}
