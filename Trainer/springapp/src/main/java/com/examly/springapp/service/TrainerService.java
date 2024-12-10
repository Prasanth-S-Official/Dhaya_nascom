package com.examly.springapp.service;

import com.examly.springapp.model.Trainer;

import java.util.List;
import java.util.Optional;

public interface TrainerService {
    Trainer addTrainer(Trainer trainer);
    Optional<Trainer> getTrainerById(Long trainerId);
    List<Trainer> getAllTrainers();
    Trainer updateTrainer(Long trainerId, Trainer trainer);
    Trainer deleteTrainer(Long trainerId);
    
}
