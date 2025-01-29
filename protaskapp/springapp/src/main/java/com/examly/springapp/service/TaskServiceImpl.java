package com.examly.springapp.service.impl;

import com.examly.springapp.exception.*;
import com.examly.springapp.model.Project;
import com.examly.springapp.model.Task;
import com.examly.springapp.model.TaskStatus;
import com.examly.springapp.repository.ProjectRepository;
import com.examly.springapp.repository.TaskRepository;
import com.examly.springapp.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Override
    public Task addTaskToProject(int projectId, Task task) throws TaskLimitExceededException, ProjectNotFoundException {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ProjectNotFoundException("Project with ID " + projectId + " not found"));

        if (project.getTasks().size() >= 10) {
            throw new TaskLimitExceededException("Task limit exceeded for Project with ID " + projectId);
        }

        task.setProject(project);
        return taskRepository.save(task);
    }

    @Override
    public List<Task> getTasksByProjectId(int projectId) throws ProjectNotFoundException {
        projectRepository.findById(projectId)
                .orElseThrow(() -> new ProjectNotFoundException("Project with ID " + projectId + " not found"));
        return taskRepository.findByProject_ProjectId(projectId);
    }

    @Override
    public Task updateTaskStatus(int taskId, String status) throws InvalidTaskStatusUpdateException, ProjectCompletedException {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new TaskNotFoundException("Task with ID " + taskId + " not found"));

        Project project = task.getProject();

        if (project.getStatus() == TaskStatus.COMPLETED) {
            throw new ProjectCompletedException("Task updates are not allowed for a project with status 'Completed'");
        }

        TaskStatus newStatus;
        try {
            newStatus = TaskStatus.valueOf(status.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new InvalidTaskStatusUpdateException("Invalid task status: " + status);
        }

        if ((task.getStatus() == TaskStatus.PENDING && newStatus != TaskStatus.IN_PROGRESS) ||
            (task.getStatus() == TaskStatus.IN_PROGRESS && newStatus != TaskStatus.COMPLETED) ||
            (task.getStatus() == TaskStatus.COMPLETED)) {
            throw new InvalidTaskStatusUpdateException("Cannot change task status from " 
                + task.getStatus() + " to " + newStatus);
        }

        task.setStatus(newStatus);
        return taskRepository.save(task);
    }
}
