package com.examly.springapp;

import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.fail;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.lang.reflect.Field;
import java.nio.file.Files;
import java.nio.file.Paths;
import static org.hamcrest.Matchers.greaterThan;
import static org.hamcrest.Matchers.not;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import jakarta.persistence.ManyToOne;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest(classes = SpringappApplication.class)
@AutoConfigureMockMvc
class SpringappApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    // ✅ Test Case 1: Create Project
    @Test
    @Order(1)
    public void backend_testCreateProject_ShouldReturn201() throws Exception {
        String projectJson = """
            {
                "name": "Project A",
                "description": "This is a sample project"
            }
        """;

        mockMvc.perform(post("/api/projects")
                .contentType(MediaType.APPLICATION_JSON)
                .content(projectJson))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.projectId").isNotEmpty())
                .andExpect(jsonPath("$.name").value("Project A"))
                .andExpect(jsonPath("$.description").value("This is a sample project"))
                .andExpect(jsonPath("$.status").value("PENDING"));
    }

    // ✅ Test Case 2: Get Project by ID (200 OK)
    @Test
    @Order(2)
    public void backend_testGetProjectById_ShouldReturn200() throws Exception {
        mockMvc.perform(get("/api/projects/{projectId}", 1)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.projectId").value(1))
                .andExpect(jsonPath("$.name").value("Project A"))
                .andExpect(jsonPath("$.description").value("This is a sample project"));
    }

    // ✅ Test Case 3: Get All Projects (200 OK)
    @Test
    @Order(3)
    public void backend_testGetAllProjects_ShouldReturn200() throws Exception {
        mockMvc.perform(get("/api/projects")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$").isArray());
    }

    // ✅ Test Case 4: Add Task to Project (201 Created)
    @Test
    @Order(4)
    public void backend_testPostTask_ShouldReturn201() throws Exception {
        String taskJson = """
            {
                "title": "Task 1",
                "status": "PENDING"
            }
        """;

        mockMvc.perform(post("/api/projects/{projectId}/tasks", 1)
                .contentType(MediaType.APPLICATION_JSON)
                .content(taskJson))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.taskId").isNotEmpty())
                .andExpect(jsonPath("$.title").value("Task 1"))
                .andExpect(jsonPath("$.status").value("PENDING"));
    }

    // ✅ Test Case 5: Get All Tasks for a Project
    @Test
    @Order(5)
    public void backend_testGetAllTasks_ShouldReturn200() throws Exception {
        mockMvc.perform(get("/api/projects/1/tasks")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$").isArray());
    }

    // ✅ Test Case 6: Get Non-Existent Project by ID (404 Not Found)
    @Test
    @Order(6)
    public void backend_testGetProjectById_NotFound_ShouldReturn404() throws Exception {
        mockMvc.perform(get("/api/projects/{projectId}", 99999)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(content().string("Project with ID 99999 not found"));
    }

    // ✅ Test Case 7: Delete Non-Existent Project (404 Not Found)
    @Test
    @Order(7)
    public void backend_testDeleteProject_NotFound_ShouldReturn404() throws Exception {
        mockMvc.perform(delete("/api/projects/{projectId}", 999)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(content().string("Project with ID 999 not found"));
    }

    // ✅ Test Case 8: Exceed Task Limit (409 Conflict)
    @Test
    @Order(8)
    public void backend_testAddTaskToProject_ExceedsTaskLimit_ShouldReturn409() throws Exception {
        String taskJson = """
            {
                "title": "Task %d",
                "status": "PENDING"
            }
        """;

        // Add 10 tasks
        for (int i = 1; i <= 10; i++) {
            mockMvc.perform(post("/api/projects/{projectId}/tasks", 1)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(String.format(taskJson, i)));
        }

        // Attempt to add the 11th task
        String taskJson11 = """
            {
                "title": "Task 11",
                "status": "PENDING"
            }
        """;

        mockMvc.perform(post("/api/projects/{projectId}/tasks", 1)
                .contentType(MediaType.APPLICATION_JSON)
                .content(taskJson11))
                .andExpect(status().isConflict())
                .andExpect(content().string("Task limit exceeded for Project with ID 1"));
    }

    @Test
    @Order(9)
    public void backend_testGetAllTasksForProject_ShouldReturn200() throws Exception {
        mockMvc.perform(get("/api/projects/{projectId}/tasks", 1)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    @Order(10)
    public void backend_testGetTasksForNonExistentProject_ShouldReturn404() throws Exception {
        mockMvc.perform(get("/api/projects/{projectId}/tasks", 999)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(content().string("Project with ID 999 not found"));
    }

    @Test
    @Order(11)
    public void backend_testUpdateTaskStatus_InvalidTransition_ShouldReturn400() throws Exception {
        mockMvc.perform(put("/api/tasks/{taskId}/status", 1)
                .param("status", "COMPLETED") // Skipping IN_PROGRESS
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isConflict())
                .andExpect(content().string("Cannot change task status from PENDING to COMPLETED"));
    }

    @Test
    @Order(12)
    public void backend_testUpdateTaskStatus_ShouldReturn200() throws Exception {
        mockMvc.perform(put("/api/tasks/{taskId}/status", 1)
                .param("status", "IN_PROGRESS")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.taskId").value(1))
                .andExpect(jsonPath("$.status").value("IN_PROGRESS"));
    }

    @Test
    @Order(13)
    public void backend_testGetProjectById_ShouldReturnProjectWithTasks() throws Exception {
        System.out.println("helo");
        mockMvc.perform(get("/api/projects/{projectId}", 1)
                .param("includeCompleted", "false") // Default case: Only Pending & In Progress tasks
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()) // ✅ Expect 200 OK
                .andExpect(jsonPath("$.projectId").value(1))
                .andExpect(jsonPath("$.name").exists())
                .andExpect(jsonPath("$.description").exists())
                .andExpect(jsonPath("$.tasks").isArray()) // ✅ Ensures tasks are included
                .andExpect(jsonPath("$.tasks.length()").value(greaterThan(0))) // ✅ Ensure tasks exist
                .andExpect(jsonPath("$.tasks[*].taskId").exists()) // ✅ Each task has a taskId
                .andExpect(jsonPath("$.tasks[*].title").exists()) // ✅ Each task has a title
                .andExpect(jsonPath("$.tasks[*].status").exists()) // ✅ Each task has a status
                .andExpect(jsonPath("$.tasks[?(@.status=='COMPLETED')]").doesNotExist()); // ✅ Ensure no task has "PENDING"
    }


    // ✅ Test Case 13: Delete Existing Project (204 No Content)
    @Test
    @Order(14)
    public void backend_testDeleteProject_ShouldReturn204() throws Exception {
        mockMvc.perform(delete("/api/projects/{projectId}", 1)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());
    }

    // ✅ Test Case 13: Validate One-To-Many Relationship
    @Test
    public void backend_testProjectHasOneToManyAnnotation() {
        try {
            Class<?> projectClass = Class.forName("com.examly.springapp.model.Project");
            Field[] fields = projectClass.getDeclaredFields();
            boolean hasOneToMany = false;
            for (Field field : fields) {
                if (field.isAnnotationPresent(jakarta.persistence.OneToMany.class)) {
                    hasOneToMany = true;
                    break;
                }
            }
            if (!hasOneToMany) {
                fail("No field with @OneToMany annotation found in Project class.");
            }
        } catch (ClassNotFoundException e) {
            fail("Class not found: " + e.getMessage());
        }
    }

    // ✅ Test Case 11: Validate Many-To-One Relationship
    @Test
    public void backend_testTaskHasManyToOneAnnotation() {
        try {
            Class<?> taskClass = Class.forName("com.examly.springapp.model.Task");
            Field[] fields = taskClass.getDeclaredFields();
            boolean hasManyToOne = false;
            for (Field field : fields) {
                if (field.isAnnotationPresent(ManyToOne.class)) {
                    hasManyToOne = true;
                    break;
                }
            }
            if (!hasManyToOne) {
                fail("No field with @ManyToOne annotation found in Task class.");
            }
        } catch (ClassNotFoundException e) {
            fail("Class not found: " + e.getMessage());
        }
    }

    // ✅ Test Case 12: Check All Files Exist
    @Test
    public void backend_testAllFilesExist() {
        String[] classNames = {
            "com.examly.springapp.model.Project",
            "com.examly.springapp.model.Task",
            "com.examly.springapp.repository.ProjectRepository",
            "com.examly.springapp.repository.TaskRepository",
            "com.examly.springapp.service.ProjectService",
            "com.examly.springapp.service.TaskService",
            "com.examly.springapp.controller.ProjectController",
            "com.examly.springapp.controller.TaskController"
        };
        for (String className : classNames) {
            try {
                Class.forName(className);
            } catch (ClassNotFoundException e) {
                fail("Class not found: " + className);
            }
        }
    }

    // ✅ Test Case 13: Check All Folders Exist
    @Test
    public void backend_testAllFoldersExist() {
        String basePath = "src/main/java/com/examly/springapp/";
        String[] folders = { "controller", "model", "repository", "service", "exception" };
        for (String folder : folders) {
            String path = basePath + folder;
            assertTrue(Files.exists(Paths.get(path)), "Folder not found: " + path);
        }
    }
}
