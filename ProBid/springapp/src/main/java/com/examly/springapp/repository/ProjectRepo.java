package com.examly.springapp.repository;

import com.examly.springapp.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepo extends JpaRepository<Project, Long> {

    @Query("SELECT p FROM Project p WHERE p.user.userId = :userId")
    List<Project> findProjectsByUserId(Long userId);

    @Query("SELECT p FROM Project p WHERE p.status = :status")
    List<Project> findProjectsByStatus(String status);

    @Query("SELECT p FROM Project p WHERE p.category = :category")
    List<Project> findProjectsByCategory(String category);

    Optional<Project> findByTitle(String title);

    boolean existsByTitle(String title);
}
