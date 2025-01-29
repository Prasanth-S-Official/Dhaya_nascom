package com.examly.springapp.service;

import com.examly.springapp.model.Task;



import com.examly.springapp.exception.TaskLimitExceededException;
import com.examly.springapp.exception.TaskNotFoundException;
import com.examly.springapp.exception.ProjectNotFoundException;
import com.examly.springapp.exception.InvalidTaskStatusUpdateException;
import com.examly.springapp.exception.ProjectCompletedException;

import java.util.List;

public interface TaskService {
    Task addTaskToProject(int projectId, Task task) throws TaskLimitExceededException, ProjectNotFoundException;
    List<Task> getTasksByProjectId(int projectId) throws ProjectNotFoundException;
    Task updateTaskStatus(int taskId, String status) throws InvalidTaskStatusUpdateException, ProjectCompletedException;
    void deleteTask(int taskId) throws TaskNotFoundException;
}
