package com.examly.springapp.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.examly.springapp.model.PhysicalTraining;

@Repository
public interface PhysicalTrainingRepo extends JpaRepository<PhysicalTraining, Long> {

    Optional<PhysicalTraining> findByTrainingName(String trainingName);
    
    
}