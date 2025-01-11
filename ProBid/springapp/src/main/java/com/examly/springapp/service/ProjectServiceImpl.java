package com.examly.springapp.service;

import com.examly.springapp.exceptions.DuplicateProjectException;
import com.examly.springapp.exceptions.ProjectNotFoundException;
import com.examly.springapp.model.Project;
import com.examly.springapp.repository.ProjectRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private ProjectRepo projectRepo;

    @Override
    public Project addProject(Project project) {
        Optional<Project> existingProject = projectRepo.findByTitle(project.getTitle());
        if (existingProject.isPresent()) {
            throw new DuplicateProjectException("Project with the same title already exists.");
        }
        return projectRepo.save(project);
    }

    @Override
    public Optional<Project> getProjectById(Long projectId) {
        return projectRepo.findById(projectId);
    }

    @Override
    public List<Project> getAllProjects() {
        return projectRepo.findAll(); // Fetch all projects from the database
    }


    @Override
    public List<Project> getProjectsByUserId(Long userId) {
        return projectRepo.findProjectsByUserId(userId);
    }

    @Override
    public Project updateProject(Long projectId, Project project) {
        if (projectRepo.existsById(projectId)) {
            project.setProjectId(projectId);
            return projectRepo.save(project);
        }
        throw new ProjectNotFoundException("Project not found for updating.");
    }

    @Override
    public Project deleteProject(Long projectId) {
        Optional<Project> existingProject = projectRepo.findById(projectId);
        if (existingProject.isPresent()) {
            projectRepo.deleteById(projectId);
            return existingProject.get();
        }
        throw new ProjectNotFoundException("Project not found for deletion.");
    }
}
