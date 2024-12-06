package com.examly.springapp.repository;

import com.examly.springapp.model.Material;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

@Repository
public interface MaterialRepo extends JpaRepository<Material, Long> {

    Optional<Material> findByMaterialName(String materialName);

    boolean existsByMaterialName(String materialName);

    @Query("SELECT m FROM Material m WHERE m.category = :category")
    List<Material> findMaterialsByCategory(String category);

    @Query("SELECT m FROM Material m WHERE m.availabilityStatus = 'In Stock'")
    List<Material> findAvailableMaterials();
}
