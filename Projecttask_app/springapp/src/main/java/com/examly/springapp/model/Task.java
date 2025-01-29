package com.examly.springapp.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Task {

import main.java.com.examly.springapp.model.TaskStatus;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int taskId;

    @NotBlank(message = "Task title cannot be blank")
    private String title;

    @Enumerated(EnumType.STRING)
    private Status status; // Use Enum for status

    @ManyToOne
    @JoinColumn(name = "project_id")
    @JsonBackReference
    private Project project;

    // Constructors
    public Task() {}

    public Task(String title, Status status, Project project) {
        this.title = title;
        this.status = status;
        this.project = project;
    }

    // Getters and Setters
    public int getTaskId() {
        return taskId;
    }

    public void setTaskId(int taskId) {
        this.taskId = taskId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }
}
