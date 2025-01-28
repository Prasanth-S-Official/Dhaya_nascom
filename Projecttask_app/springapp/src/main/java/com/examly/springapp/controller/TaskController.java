package com.examly.springapp.controller;

import com.examly.springapp.model.Task;
import com.examly.springapp.service.TaskService;
import com.examly.springapp.exception.TaskLimitExceededException;
import com.examly.springapp.exception.ProjectNotFoundException;
import com.examly.springapp.exception.InvalidTaskStatusUpdateException;
import com.examly.springapp.exception.ProjectCompletedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;

@RestController
@RequestMapping("/api/projects/{projectId}/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> addTaskToProject(@PathVariable int projectId, @RequestBody Task task) {
        try {
            Task createdTask = taskService.addTaskToProject(projectId, task);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
        } catch (ProjectNotFoundException ex) {
            // Handle case where the project doesn't exist
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        } catch (TaskLimitExceededException ex) {
            // Handle case where task limit is exceeded
            return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
        } catch (Exception ex) {
            // Handle any unexpected error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
    }
    

    @GetMapping
    public ResponseEntity<?> getTasksByProject(@PathVariable int projectId) {
        try {
            List<Task> tasks = taskService.getTasksByProjectId(projectId);
            if (tasks.isEmpty()) {
                // Return a 204 No Content status if no tasks found
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No tasks found for the project.");
            }
            return ResponseEntity.ok(tasks); // Return 200 OK with the list of tasks
        } catch (ProjectNotFoundException ex) {
            // Handle case where the project doesn't exist
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        } catch (Exception ex) {
            // Handle any unexpected error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
    }
    

    @PutMapping("/{taskId}/status")
    public Task updateTaskStatus(@PathVariable int taskId, @RequestParam String status) throws InvalidTaskStatusUpdateException, ProjectCompletedException {
        return taskService.updateTaskStatus(taskId, status);
    }
}
