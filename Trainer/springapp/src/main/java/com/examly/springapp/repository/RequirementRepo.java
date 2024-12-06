package com.examly.springapp.repository;

import com.examly.springapp.model.Requirement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

@Repository
public interface RequirementRepo extends JpaRepository<Requirement, Long> {

    // Find Requirement by Title
    Optional<Requirement> findByTitle(String title);

    // Check if a Requirement exists by Title
    boolean existsByTitle(String title);

    // Custom Query: Find Requirements by Department
    @Query("SELECT r FROM Requirement r WHERE r.department = :department")
    List<Requirement> findRequirementsByDepartment(String department);

    // Custom Query: Find Open Requirements
    @Query("SELECT r FROM Requirement r WHERE r.status = 'Open'")
    List<Requirement> findOpenRequirements();

    // Custom Query: Find High-Priority Requirements
    @Query("SELECT r FROM Requirement r WHERE r.priority = 'High'")
    List<Requirement> findHighPriorityRequirements();

    // Custom Query: Find Requirements by Skill Level
    @Query("SELECT r FROM Requirement r WHERE r.skillLevel = :skillLevel")
    List<Requirement> findRequirementsBySkillLevel(String skillLevel);
}
