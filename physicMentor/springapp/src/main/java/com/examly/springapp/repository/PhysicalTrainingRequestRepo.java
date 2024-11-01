package com.examly.springapp.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.examly.springapp.model.PhysicalTrainingRequest;

@Repository
public interface PhysicalTrainingRequestRepo extends JpaRepository<PhysicalTrainingRequest, Long> {

    @Query("SELECT p FROM PhysicalTrainingRequest p WHERE p.user.userId = :userId")
    List<PhysicalTrainingRequest> findPhysicalTrainingRequestsByUserId(Long userId);
    
    @Query("SELECT p FROM PhysicalTrainingRequest p WHERE p.physicalTraining.physicalTrainingId = :physicalTrainingId")
    List<PhysicalTrainingRequest> findPhysicalTrainingRequestsByTrainingId(Long physicalTrainingId);
}
