package com.examly.springapp;

import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.fail;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import java.lang.reflect.Field;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import jakarta.persistence.ManyToOne;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest(classes = SpringappApplication.class)
@AutoConfigureMockMvc
class SpringappApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    // ✅ Check API: Get All Projects
    @Test
    @Order(1)
    public void backend_testGetAllProjects() throws Exception {
        mockMvc.perform(get("/api/projects")
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andDo(print())
            .andExpect(content().contentType("application/json"))
            .andExpect(jsonPath("$").isArray())
            .andReturn();
    }

    // ✅ Check API: Get All Tasks for a Project
    @Test
    @Order(2)
    public void backend_testGetAllTasks() throws Exception {
        mockMvc.perform(get("/api/projects/1/tasks")
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andDo(print())
            .andExpect(content().contentType("application/json"))
            .andExpect(jsonPath("$").isArray())
            .andReturn();
    }

    // ✅ Check if Project has a One-To-Many Relationship with Task
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

    // ✅ Check if Task has a Many-To-One Relationship with Project
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

    // ✅ Check if all required files (classes) exist
    @Test
    public void backend_testAllFilesExist() {
        String[] classNames = {
            "com.examly.springapp.model.Project",
            "com.examly.springapp.model.Task",
            "com.examly.springapp.model.TaskStatus",
            "com.examly.springapp.repository.ProjectRepository",
            "com.examly.springapp.repository.TaskRepository",
            "com.examly.springapp.service.ProjectService",
            "com.examly.springapp.service.TaskService",
            "com.examly.springapp.controller.ProjectController",
            "com.examly.springapp.controller.TaskController",
            "com.examly.springapp.exception.ProjectNotFoundException",
            "com.examly.springapp.exception.TaskNotFoundException",
            "com.examly.springapp.exception.InvalidTaskStatusUpdateException",
            "com.examly.springapp.exception.ProjectCompletedException",
            "com.examly.springapp.exception.TaskLimitExceededException"
        };
        for (String className : classNames) {
            try {
                Class.forName(className);
            } catch (ClassNotFoundException e) {
                fail("Class not found: " + className);
            }
        }
    }

    // ✅ Check if all required folders exist
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
