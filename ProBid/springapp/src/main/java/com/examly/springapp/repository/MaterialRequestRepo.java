package com.examly.springapp.repository;

import com.examly.springapp.model.MaterialRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

@Repository
public interface MaterialRequestRepo extends JpaRepository<MaterialRequest, Long> {

    @Query("SELECT r FROM MaterialRequest r WHERE r.user.userId = :userId")
    List<MaterialRequest> findMaterialRequestsByUserId(Long userId);

    @Query("SELECT r FROM MaterialRequest r WHERE r.material.materialId = :materialId")
    List<MaterialRequest> findMaterialRequestsByMaterialId(Long materialId);

    Optional<MaterialRequest> findByUser_UserIdAndMaterial_MaterialId(Long userId, Long materialId);
}
