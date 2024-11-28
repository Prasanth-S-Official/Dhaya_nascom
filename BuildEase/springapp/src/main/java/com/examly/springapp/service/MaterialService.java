package com.examly.springapp.service;

import com.examly.springapp.model.Material;

import java.util.List;
import java.util.Optional;

public interface MaterialService {
    Material addMaterial(Material material);
    Optional<Material> getMaterialById(Long materialId);
    List<Material> getAllMaterials();
    Material updateMaterial(Long materialId, Material material);
    Material deleteMaterial(Long materialId);
}
