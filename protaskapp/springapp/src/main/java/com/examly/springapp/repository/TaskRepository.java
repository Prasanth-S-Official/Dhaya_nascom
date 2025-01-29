package com.examly.springapp.repository;

import com.examly.springapp.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {
    List<Task> findByStatusAndProject_ProjectIdNotIn(String status, List<Integer> projectIds);
    // Custom query to fetch tasks with the given status for a specific project
    List<Task> findByProjectIdAndStatusIn(int projectId, List<String> statuses);

    // Custom query to fetch all tasks for a specific project (no filtering)
    List<Task> findByProjectId(int projectId);
}
