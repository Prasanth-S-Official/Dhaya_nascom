package com.examly.springapp.repository;

import com.examly.springapp.model.Trainer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

@Repository
public interface TrainerRepo extends JpaRepository<Trainer, Long> {

    // Find Trainer by Name
    Optional<Trainer> findByName(String name);

    // Check if a Trainer exists by Email
    boolean existsByEmail(String email);

    // Custom Query: Find Trainers by Expertise
    @Query("SELECT t FROM Trainer t WHERE t.expertise = :expertise")
    List<Trainer> findTrainersByExpertise(String expertise);

    // Custom Query: Find Active Trainers
    @Query("SELECT t FROM Trainer t WHERE t.status = 'Active'")
    List<Trainer> findActiveTrainers();
}
