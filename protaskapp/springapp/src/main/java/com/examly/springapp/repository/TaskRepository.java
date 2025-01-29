package com.examly.springapp.repository;

import com.examly.springapp.model.Task;
import com.examly.springapp.model.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {
    List<Task> findByProject_ProjectIdAndStatusIn(int projectId, List<TaskStatus> statuses);
    List<Task> findByProject_ProjectId(int projectId);
}
