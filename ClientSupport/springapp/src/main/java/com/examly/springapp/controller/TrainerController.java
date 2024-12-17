package com.examly.springapp.controller;

import com.examly.springapp.model.Trainer;
import com.examly.springapp.service.TrainerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/trainer")
public class TrainerController {

    @Autowired
    private TrainerService trainerService;

    @PostMapping
    public ResponseEntity<?> addTrainer(@RequestBody Trainer trainer) {
        Trainer newTrainer = trainerService.addTrainer(trainer);
        return new ResponseEntity<>(newTrainer, HttpStatus.CREATED);
    }

    @GetMapping("/{trainerId}")
    public ResponseEntity<Trainer> getTrainerById(@PathVariable Long trainerId) {
        Optional<Trainer> trainer = trainerService.getTrainerById(trainerId);
        return trainer.map(value -> ResponseEntity.status(HttpStatus.OK).body(value))
                      .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping
    public ResponseEntity<List<Trainer>> getAllTrainers() {
        List<Trainer> allTrainers = trainerService.getAllTrainers();
        return ResponseEntity.status(HttpStatus.OK).body(allTrainers);
    }

    @PutMapping("/{trainerId}")
    public ResponseEntity<Trainer> updateTrainer(@PathVariable Long trainerId, @RequestBody Trainer trainer) {
        Trainer updatedTrainer = trainerService.updateTrainer(trainerId, trainer);
        if (updatedTrainer != null) {
            return ResponseEntity.status(HttpStatus.OK).body(updatedTrainer);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{trainerId}")
    public ResponseEntity<Trainer> deleteTrainer(@PathVariable Long trainerId) {
        Trainer deletedTrainer = trainerService.deleteTrainer(trainerId);
        if (deletedTrainer != null) {
            return ResponseEntity.status(HttpStatus.OK).body(deletedTrainer);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
