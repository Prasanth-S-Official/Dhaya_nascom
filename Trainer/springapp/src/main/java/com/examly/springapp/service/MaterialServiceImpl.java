package com.examly.springapp.service;

import com.examly.springapp.exceptions.DuplicateRequirementException;
import com.examly.springapp.exceptions.RequirementDeletionException;
import com.examly.springapp.model.Material;
import com.examly.springapp.repository.MaterialRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MaterialServiceImpl implements MaterialService {

    @Autowired
    private MaterialRepo materialRepo;

    @Override
    public Material addMaterial(Material material) {
        Optional<Material> existingMaterial = materialRepo.findByMaterialName(material.getMaterialName());
        if (existingMaterial.isPresent()) {
            throw new DuplicateRequirementException("Material with the same name already exists.");
        }
        return materialRepo.save(material);
    }

    @Override
    public Optional<Material> getMaterialById(Long materialId) {
        return materialRepo.findById(materialId);
    }

    @Override
    public List<Material> getAllMaterials() {
        return materialRepo.findAll();
    }

    @Override
    public Material updateMaterial(Long materialId, Material material) {
        if (materialRepo.existsById(materialId)) {
            material.setMaterialId(materialId);
            return materialRepo.save(material);
        }
        return null;
    }

    @Override
    public Material deleteMaterial(Long materialId) {
        Optional<Material> existingMaterial = materialRepo.findById(materialId);
        if (existingMaterial.isPresent()) {
            materialRepo.deleteById(materialId);
            return existingMaterial.get();
        } else {
            throw new RequirementDeletionException("Material not found for deletion.");
        }
    }
}
