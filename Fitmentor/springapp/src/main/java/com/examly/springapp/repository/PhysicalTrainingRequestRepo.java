package com.examly.springapp.repository;

import com.examly.springapp.model.PhysicalTrainingRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PhysicalTrainingRequestRepo extends JpaRepository<PhysicalTrainingRequest, Long> {

    @Query("SELECT p FROM PhysicalTrainingRequest p WHERE p.user.userId = :userId")
    List<PhysicalTrainingRequest> findPhysicalTrainingRequestsByUserId(long userId);

    @Query("SELECT p FROM PhysicalTrainingRequest p WHERE p.physicalTraining.physicalTrainingId = :physicalTrainingId")
    List<PhysicalTrainingRequest> findPhysicalTrainingRequestsByTrainingId(Long physicalTrainingId);

    Optional<PhysicalTrainingRequest> findByUser_UserIdAndPhysicalTraining_PhysicalTrainingId(long userId, Long physicalTrainingId);

    boolean existsByPhysicalTraining_PhysicalTrainingId(Long physicalTrainingId);
}