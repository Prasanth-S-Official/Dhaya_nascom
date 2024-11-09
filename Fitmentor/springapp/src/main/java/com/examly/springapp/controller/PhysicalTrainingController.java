// PhysicalTrainingController.java
package com.examly.springapp.controller;

import com.examly.springapp.exceptions.PhysicalTrainingException;
import com.examly.springapp.model.PhysicalTraining;
import com.examly.springapp.service.PhysicalTrainingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/physicalTraining")
public class PhysicalTrainingController {

    @Autowired
    private PhysicalTrainingService trainingService;

    @PostMapping
    public ResponseEntity<?> addTraining(@RequestBody PhysicalTraining training) {
        try {
            PhysicalTraining newTraining = trainingService.addPhysicalTraining(training);
            return new ResponseEntity<>(newTraining, HttpStatus.CREATED);
        } catch (PhysicalTrainingException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        }
    }

    @GetMapping("/{trainingId}")
    public ResponseEntity<PhysicalTraining> getTrainingById(@PathVariable Long trainingId) {
        Optional<PhysicalTraining> training = trainingService.getPhysicalTrainingById(trainingId);
        if (training.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(training.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<PhysicalTraining>> getAllTrainings() {
        List<PhysicalTraining> allTrainings = trainingService.getAllPhysicalTrainings();
        return ResponseEntity.status(HttpStatus.OK).body(allTrainings);
    }

    @PutMapping("/{trainingId}")
    public ResponseEntity<PhysicalTraining> updateTraining(@PathVariable Long trainingId, @RequestBody PhysicalTraining training) {
        PhysicalTraining updatedTraining = trainingService.updatePhysicalTraining(trainingId, training);
        if (updatedTraining != null) {
            return ResponseEntity.status(HttpStatus.OK).body(updatedTraining);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{trainingId}")
    public ResponseEntity<PhysicalTraining> deleteTraining(@PathVariable Long trainingId) {
        PhysicalTraining deletedTraining = trainingService.deletePhysicalTraining(trainingId);
        if (deletedTraining != null) {
            return ResponseEntity.status(HttpStatus.OK).body(deletedTraining);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}