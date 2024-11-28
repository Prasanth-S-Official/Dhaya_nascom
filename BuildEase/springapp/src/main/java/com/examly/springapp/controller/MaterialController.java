package com.examly.springapp.controller;

import com.examly.springapp.model.Material;
import com.examly.springapp.service.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/material")
public class MaterialController {

    @Autowired
    private MaterialService materialService;

    @PostMapping
    public ResponseEntity<?> addMaterial(@RequestBody Material material) {
        Material newMaterial = materialService.addMaterial(material);
        return new ResponseEntity<>(newMaterial, HttpStatus.CREATED);
    }

    @GetMapping("/{materialId}")
    public ResponseEntity<Material> getMaterialById(@PathVariable Long materialId) {
        Optional<Material> material = materialService.getMaterialById(materialId);
        return material.map(value -> ResponseEntity.status(HttpStatus.OK).body(value))
                       .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping
    public ResponseEntity<List<Material>> getAllMaterials() {
        List<Material> allMaterials = materialService.getAllMaterials();
        return ResponseEntity.status(HttpStatus.OK).body(allMaterials);
    }

    @PutMapping("/{materialId}")
    public ResponseEntity<Material> updateMaterial(@PathVariable Long materialId, @RequestBody Material material) {
        Material updatedMaterial = materialService.updateMaterial(materialId, material);
        if (updatedMaterial != null) {
            return ResponseEntity.status(HttpStatus.OK).body(updatedMaterial);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{materialId}")
    public ResponseEntity<Material> deleteMaterial(@PathVariable Long materialId) {
        Material deletedMaterial = materialService.deleteMaterial(materialId);
        if (deletedMaterial != null) {
            return ResponseEntity.status(HttpStatus.OK).body(deletedMaterial);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
