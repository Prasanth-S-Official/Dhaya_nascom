package com.examly.springapp.service.impl;

import com.examly.springapp.model.Project;
import com.examly.springapp.model.Task;
import com.examly.springapp.repository.ProjectRepository;
import com.examly.springapp.repository.TaskRepository;
import com.examly.springapp.exception.ProjectNotFoundException;
import com.examly.springapp.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Override
    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    @Override
    public Project getProjectById(int projectId, boolean includeCompleted) throws ProjectNotFoundException {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ProjectNotFoundException("Project with ID " + projectId + " not found"));

        if (!includeCompleted) {
            List<Task> filteredTasks = taskRepository.findByProject_ProjectIdAndStatusIn(
                    projectId, List.of("Pending", "In Progress")
            );
            project.setTasks(filteredTasks);
        } else {
            List<Task> allTasks = taskRepository.findByProjectId(projectId);
            project.setTasks(allTasks);
        }

        return project;
    }

    @Override
    public void deleteProjectById(int projectId) throws ProjectNotFoundException {
        if (!projectRepository.existsById(projectId)) {
            throw new ProjectNotFoundException("Project with ID " + projectId + " not found");
        }
        projectRepository.deleteById(projectId);
    }

    @Override
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }
}
