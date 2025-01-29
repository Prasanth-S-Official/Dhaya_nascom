package com.examly.springapp.controller;

import com.examly.springapp.model.Project;
import com.examly.springapp.service.ProjectService;
import com.examly.springapp.exception.ProjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @PostMapping
    public ResponseEntity<Project> createProject(@RequestBody Project project) {
        return ResponseEntity.status(HttpStatus.CREATED).body(projectService.createProject(project));
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<?> getProjectById(
            @PathVariable int projectId,
            @RequestParam(required = false, defaultValue = "false") boolean includeCompleted) {
        try {
            Project project = projectService.getProjectById(projectId, includeCompleted);
            return ResponseEntity.ok(project);
        } catch (ProjectNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<?> deleteProject(@PathVariable int projectId) {
        try {
            projectService.deleteProjectById(projectId);
            return ResponseEntity.noContent().build();
        } catch (ProjectNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects() {
        List<Project> projects = projectService.getAllProjects();
        return ResponseEntity.ok(projects);
    }
}
