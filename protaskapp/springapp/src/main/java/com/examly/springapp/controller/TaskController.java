// package com.examly.springapp.controller;

// import com.examly.springapp.model.Task;
// import com.examly.springapp.service.TaskService;
// import com.examly.springapp.exception.TaskLimitExceededException;
// import com.examly.springapp.exception.ProjectNotFoundException;
// import com.examly.springapp.exception.InvalidTaskStatusUpdateException;
// import com.examly.springapp.exception.ProjectCompletedException;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.web.bind.annotation.*;
// import org.springframework.http.ResponseEntity;
// import java.util.List;

// @RestController
// @RequestMapping("/api/projects/{projectId}/tasks")
// public class TaskController {

//     @Autowired
//     private TaskService taskService;

//     @PostMapping
//     @ResponseStatus(HttpStatus.CREATED)
//     public ResponseEntity<?> addTaskToProject(@PathVariable int projectId, @RequestBody Task task) {
//         try {
//             Task createdTask = taskService.addTaskToProject(projectId, task);
//             return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
//         } catch (ProjectNotFoundException ex) {
//             // Handle case where the project doesn't exist
//             return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
//         } catch (TaskLimitExceededException ex) {
//             // Handle case where task limit is exceeded
//             return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
//         } catch (Exception ex) {
//             // Handle any unexpected error
//             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
//         }
//     }
    

//     @GetMapping
//     public ResponseEntity<?> getTasksByProject(@PathVariable int projectId) {
//         try {
//             List<Task> tasks = taskService.getTasksByProjectId(projectId);
//             if (tasks.isEmpty()) {
//                 // Return a 204 No Content status if no tasks found
//                 return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No tasks found for the project.");
//             }
//             return ResponseEntity.ok(tasks); // Return 200 OK with the list of tasks
//         } catch (ProjectNotFoundException ex) {
//             // Handle case where the project doesn't exist
//             return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
//         } catch (Exception ex) {
//             // Handle any unexpected error
//             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
//         }
//     }
    

//     @PutMapping("/{taskId}/status")
//     public Task updateTaskStatus(@PathVariable int taskId, @RequestParam String status) throws InvalidTaskStatusUpdateException, ProjectCompletedException {
//         return taskService.updateTaskStatus(taskId, status);
//     }
// }


package com.examly.springapp.controller;

import com.examly.springapp.model.Task;
import com.examly.springapp.service.TaskService;
import com.examly.springapp.exception.TaskLimitExceededException;
import com.examly.springapp.exception.ProjectNotFoundException;
import com.examly.springapp.exception.TaskNotFoundException;
import com.examly.springapp.exception.InvalidTaskStatusUpdateException;
import com.examly.springapp.exception.ProjectCompletedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;

@RestController
@RequestMapping("/api")
public class TaskController {

    @Autowired
    private TaskService taskService;

    // ✅ Add Task to a Project
    @PostMapping("/projects/{projectId}/tasks")
    public ResponseEntity<?> addTaskToProject(@PathVariable int projectId, @RequestBody Task task) {
        try {
            Task createdTask = taskService.addTaskToProject(projectId, task);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
        } catch (ProjectNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        } catch (TaskLimitExceededException ex) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
    }

    // ✅ Get All Tasks for a Project
    @GetMapping("/projects/{projectId}/tasks")
    public ResponseEntity<?> getTasksByProject(@PathVariable int projectId) {
        try {
            List<Task> tasks = taskService.getTasksByProjectId(projectId);
            if (tasks.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No tasks found for the project.");
            }
            return ResponseEntity.ok(tasks);
        } catch (ProjectNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
    }

    // ✅ Update Task Status (FIXED ENDPOINT)
    @PutMapping("/tasks/{taskId}/status")
    public ResponseEntity<?> updateTaskStatus(@PathVariable int taskId, @RequestParam String status) {
        try {
            Task updatedTask = taskService.updateTaskStatus(taskId, status);
            return ResponseEntity.ok(updatedTask);
        } catch (TaskNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        } catch (InvalidTaskStatusUpdateException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        } catch (ProjectCompletedException ex) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
    }

    // ✅ Delete a Task
    @DeleteMapping("/tasks/{taskId}")
    public ResponseEntity<?> deleteTask(@PathVariable int taskId) {
        try {
            taskService.deleteTask(taskId);
            return ResponseEntity.noContent().build();
        } catch (TaskNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
    }
}
