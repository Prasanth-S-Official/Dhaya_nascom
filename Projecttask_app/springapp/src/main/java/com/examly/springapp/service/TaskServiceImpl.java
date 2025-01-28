package com.examly.springapp.service.impl;

import com.examly.springapp.model.Task;
import com.examly.springapp.model.Project;
import com.examly.springapp.repository.ProjectRepository;
import com.examly.springapp.repository.TaskRepository;
import com.examly.springapp.exception.TaskLimitExceededException;
import com.examly.springapp.exception.ProjectNotFoundException;
import com.examly.springapp.exception.InvalidTaskStatusUpdateException;
import com.examly.springapp.exception.ProjectCompletedException;
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
        return taskRepository.findByProjectId(projectId);
    }

    @Override
    public Task updateTaskStatus(int taskId, String status) throws InvalidTaskStatusUpdateException, ProjectCompletedException {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ProjectNotFoundException("Task with ID " + taskId + " not found"));
        Project project = task.getProject();

        if ("Completed".equals(project.getStatus())) {
            throw new ProjectCompletedException("Task updates are not allowed for a project with status 'Completed'");
        }

        validateTaskStatus(task.getStatus(), status);

        task.setStatus(status);
        return taskRepository.save(task);
    }

    private void validateTaskStatus(String currentStatus, String newStatus) throws InvalidTaskStatusUpdateException {
        if ("Completed".equals(newStatus) && !"In Progress".equals(currentStatus)) {
            throw new InvalidTaskStatusUpdateException("Cannot directly change task status from " + currentStatus + " to " + newStatus);
        }
    }
}
