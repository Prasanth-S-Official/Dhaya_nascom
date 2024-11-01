package com.examly.springapp.controller;

import com.examly.springapp.exceptions.PhysicalTrainingException;
import com.examly.springapp.model.PhysicalTraining;
import com.examly.springapp.service.PhysicalTrainingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/physicalTraining")
public class PhysicalTrainingController {

    @Autowired
    private PhysicalTrainingService trainingService;

    @GetMapping
    public ResponseEntity<List<PhysicalTraining>> getAllTrainings() {
        List<PhysicalTraining> trainings = trainingService.getAllPhysicalTrainings();
        return ResponseEntity.ok(trainings);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PhysicalTraining> getTrainingById(@PathVariable Long id) {
        PhysicalTraining training = trainingService.getPhysicalTrainingById(id);
        if (training != null) {
            return ResponseEntity.ok(training);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<PhysicalTraining> addTraining(@RequestBody PhysicalTraining training) {
        try {
            PhysicalTraining addedTraining = trainingService.addPhysicalTraining(training);
            return ResponseEntity.status(HttpStatus.CREATED).body(addedTraining);
        } catch (PhysicalTrainingException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<PhysicalTraining> updateTraining(@PathVariable Long id, @RequestBody PhysicalTraining training) {
        PhysicalTraining updatedTraining = trainingService.updatePhysicalTraining(id, training);
        if (updatedTraining != null) {
            return ResponseEntity.ok(updatedTraining);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTraining(@PathVariable Long id) {
        boolean deleted = trainingService.deletePhysicalTraining(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
