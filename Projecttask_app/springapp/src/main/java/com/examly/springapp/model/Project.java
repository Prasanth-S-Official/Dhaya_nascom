package com.examly.springapp.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.*;
import java.util.List;

@Entity
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int projectId;
    
    private String name;
    private String description;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Task> tasks;

    // Getters, Setters, Constructors
    public Project() {}
    
    public Project(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public int getProjectId() {
        return projectId;
    }

    public void setProjectId(int projectId) {
        this.projectId = projectId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }
}
