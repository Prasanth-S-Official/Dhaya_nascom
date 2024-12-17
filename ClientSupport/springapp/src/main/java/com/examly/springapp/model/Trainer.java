package com.examly.springapp.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Trainer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long trainerId;

    private String name;
    private String email;
    private String phone;
    private String expertise; // e.g., "Java", "Angular"
    private String experience; // e.g., "5 years"
    private String certification; // e.g., "AWS Certified"
    

    @Lob
    @Column(name = "resume", nullable = true, columnDefinition = "LONGBLOB")
    private String resume; // Binary data for storing the resume file

    private LocalDate joiningDate;
    private String status; // e.g., "Active", "Inactive"

    // Constructor with parameters
    public Trainer(Long trainerId, String name, String email, String phone, String expertise, String experience,
    String certification, String resume, LocalDate joiningDate, String status) {
    this.trainerId = trainerId;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.expertise = expertise;
    this.experience = experience;
    this.certification = certification;
    this.resume = resume;
    this.joiningDate = joiningDate;
    this.status = status;
    }


    // Default constructor
    public Trainer() {
    }


    public Long getTrainerId() {
        return trainerId;
    }


    public void setTrainerId(Long trainerId) {
        this.trainerId = trainerId;
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


    public String getCertification() {
        return certification;
    }


    public void setCertification(String certification) {
        this.certification = certification;
    }


    public String getResume() {
        return resume;
    }


    public void setResume(String resume) {
        this.resume = resume;
    }


    public LocalDate getJoiningDate() {
        return joiningDate;
    }


    public void setJoiningDate(LocalDate joiningDate) {
        this.joiningDate = joiningDate;
    }


    public String getStatus() {
        return status;
    }


    public void setStatus(String status) {
        this.status = status;
    }

    

}
