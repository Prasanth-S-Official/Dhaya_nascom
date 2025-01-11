package com.examly.springapp.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
public class Bid {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bidId;

    @ManyToOne
    @JoinColumn(name = "projectId", nullable = false)
    private Project project; // The project being bid on

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user; // The freelancer submitting the bid

    private Double bidAmount; // Amount the freelancer is bidding
    @Column(length = 1000)
    private String proposal; // Detailed proposal/message
    private LocalDateTime submissionDate; // Timestamp when the bid was submitted
    private String status; // "Pending", "Accepted", "Rejected", "Withdrawn"
    private LocalDate timeEstimation; // Estimated time required to complete the project

    @Lob
    @Column(name = "resumeImage", nullable = true, columnDefinition = "LONGBLOB")
    private String resumeImage; // Resume image as a Base64 string
    private String communicationPreference; // Preferred mode of communication

    @Column(nullable = true) // Allows the rating to be nullable
    private Integer rating; // Client's rating of the freelancer after bid acceptance and project completion

    @Column(length = 500 , nullable = true) 
    private String withdrawReason; // Reason for withdrawal (optional)

    // Constructor with parameters
    public Bid(Long bidId, Project project, User user, Double bidAmount, String proposal,
               LocalDateTime submissionDate, String status, LocalDate timeEstimation, String resumeImage,
               String communicationPreference, Integer rating, String withdrawReason) {
        this.bidId = bidId;
        this.project = project;
        this.user = user;
        this.bidAmount = bidAmount;
        this.proposal = proposal;
        this.submissionDate = submissionDate;
        this.status = status;
        this.timeEstimation = timeEstimation;
        this.resumeImage = resumeImage;
        this.communicationPreference = communicationPreference;
        this.rating = rating; // Can be null initially
        this.withdrawReason = withdrawReason;
    }

    // Default constructor
    public Bid() {
        this.rating = null; // Explicitly set rating to null in the default constructor
    }

    // Getters and Setters
    public Long getBidId() {
        return bidId;
    }

    public void setBidId(Long bidId) {
        this.bidId = bidId;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Double getBidAmount() {
        return bidAmount;
    }

    public void setBidAmount(Double bidAmount) {
        this.bidAmount = bidAmount;
    }

    public String getProposal() {
        return proposal;
    }

    public void setProposal(String proposal) {
        this.proposal = proposal;
    }

    public LocalDateTime getSubmissionDate() {
        return submissionDate;
    }

    public void setSubmissionDate(LocalDateTime submissionDate) {
        this.submissionDate = submissionDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getTimeEstimation() {
        return timeEstimation;
    }

    public void setTimeEstimation(LocalDate timeEstimation) {
        this.timeEstimation = timeEstimation;
    }

    public String getResumeImage() {
        return resumeImage;
    }

    public void setResumeImage(String resumeImage) {
        this.resumeImage = resumeImage;
    }

    public String getCommunicationPreference() {
        return communicationPreference;
    }

    public void setCommunicationPreference(String communicationPreference) {
        this.communicationPreference = communicationPreference;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getWithdrawReason() {
        return withdrawReason;
    }

    public void setWithdrawReason(String withdrawReason) {
        this.withdrawReason = withdrawReason;
    }
}
