package com.examly.springapp.service.impl;

import com.examly.springapp.exception.ProjectNotFoundException;
import com.examly.springapp.model.Project;
import com.examly.springapp.model.TaskStatus;
import com.examly.springapp.repository.ProjectRepository;
import com.examly.springapp.repository.TaskRepository;
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
    public Project getProjectById(int projectId, boolean includeCompleted) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ProjectNotFoundException("Project with ID " + projectId + " not found"));

        // If 'includeCompleted' is false, filter tasks to show only Pending & In Progress
        if (!includeCompleted) {
            project.setTasks(taskRepository.findByProject_ProjectIdAndStatusIn(
                    projectId, List.of(TaskStatus.PENDING, TaskStatus.IN_PROGRESS)
            ));
        } else {
            project.setTasks(taskRepository.findByProject_ProjectId(projectId));
        }

        return project;
    }

    @Override
    public void deleteProjectById(int projectId) throws ProjectNotFoundException {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ProjectNotFoundException("Project with ID " + projectId + " not found"));

        projectRepository.delete(project);
    }

    @Override
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }
}
