package com.examly.springapp.service;

import com.examly.springapp.model.Project;

import java.util.List;
import java.util.Optional;

public interface ProjectService {
    Project addProject(Project project);
    Optional<Project> getProjectById(Long projectId);
    List<Project> getAllProjects();
    List<Project> getProjectsByUserId(Long userId);
    Project updateProject(Long projectId, Project project);
    Project deleteProject(Long projectId);
}
