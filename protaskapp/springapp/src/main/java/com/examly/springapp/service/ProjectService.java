package com.examly.springapp.service;

import com.examly.springapp.model.Project;
import com.examly.springapp.exception.ProjectNotFoundException;

import java.util.List;

public interface ProjectService {
    Project createProject(Project project);
    Project getProjectById(int projectId, boolean includeCompleted);
    void deleteProjectById(int projectId) throws ProjectNotFoundException;
    List<Project> getAllProjects();
}
