package com.examly.springapp.service;

import com.examly.springapp.exceptions.DuplicateTrainerException;
import com.examly.springapp.exceptions.TrainerDeletionException;
import com.examly.springapp.model.Trainer;
import com.examly.springapp.repository.TrainerRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TrainerServiceImpl implements TrainerService {

    @Autowired
    private TrainerRepo trainerRepo;

    @Override
    public Trainer addTrainer(Trainer trainer) {
        Optional<Trainer> existingTrainer = trainerRepo.findByEmail(trainer.getEmail());
        if (existingTrainer.isPresent()) {
            throw new DuplicateTrainerException("Trainer with the same email already exists.");
        }
        return trainerRepo.save(trainer);
    }

    @Override
    public Optional<Trainer> getTrainerById(Long trainerId) {
        return trainerRepo.findById(trainerId);
    }

    @Override
    public List<Trainer> getAllTrainers() {
        return trainerRepo.findAll();
    }

    @Override
    public Trainer updateTrainer(Long trainerId, Trainer trainer) {
        if (trainerRepo.existsById(trainerId)) {
            trainer.setTrainerId(trainerId);
            return trainerRepo.save(trainer);
        }
        return null;
    }

    @Override
    public Trainer deleteTrainer(Long trainerId) {
        Optional<Trainer> existingTrainer = trainerRepo.findById(trainerId);
        if (existingTrainer.isPresent()) {
            trainerRepo.deleteById(trainerId);
            return existingTrainer.get();
        } else {
            throw new TrainerDeletionException("Trainer not found for deletion.");
        }
    }
}
