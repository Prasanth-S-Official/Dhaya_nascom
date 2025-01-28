package com.examly.springapp.service.impl;

import com.examly.springapp.model.Project;
import com.examly.springapp.repository.ProjectRepository;
import com.examly.springapp.exception.ProjectNotFoundException;
import com.examly.springapp.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Override
    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    @Override
    public Project getProjectById(int projectId, boolean includeCompleted) {
        // Retrieve the project from the database
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ProjectNotFoundException("Project with ID " + projectId + " not found"));

        // If 'includeCompleted' is false (default), filter tasks by status
        if (!includeCompleted) {
            project.setTasks(taskRepository.findByProjectIdAndStatusIn(projectId, List.of("Pending", "In Progress")));
        } else {
            // Include all tasks (including Completed tasks)
            project.setTasks(taskRepository.findByProjectId(projectId));
        }

        return project;
    }

    @DeleteMapping("/{projectId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<?> deleteProject(@PathVariable int projectId) {
        try {
            projectService.deleteProjectById(projectId);
            return ResponseEntity.noContent().build();  // 204 No Content
        } catch (ProjectNotFoundException ex) {
            // Handle the case when the project is not found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        } catch (Exception ex) {
            // Handle other unexpected exceptions
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
    }
    
    @Override
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }
}
