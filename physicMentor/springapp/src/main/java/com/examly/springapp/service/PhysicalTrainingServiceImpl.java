package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.exceptions.DuplicateTrainingException;
import com.examly.springapp.exceptions.TrainingDeletionException;
import com.examly.springapp.model.PhysicalTraining;
import com.examly.springapp.repository.PhysicalTrainingRepo;
import com.examly.springapp.repository.PhysicalTrainingRequestRepo;

@Service
public class PhysicalTrainingServiceImpl implements PhysicalTrainingService {

    @Autowired
    private PhysicalTrainingRepo physicalTrainingRepo;

    @Autowired
    private PhysicalTrainingRequestRepo physicalTrainingRequestRepo;

    @Override
    public PhysicalTraining addPhysicalTraining(PhysicalTraining training) {
        // Check for duplicate training name
        Optional<PhysicalTraining> existingTraining = physicalTrainingRepo.findByTrainingName(training.getTrainingName());
        if (existingTraining.isPresent()) {
            throw new DuplicateTrainingException("Training with the name " + training.getTrainingName() + " already exists.");
        }
        return physicalTrainingRepo.save(training);
    }

    @Override
    public Optional<PhysicalTraining> getPhysicalTrainingById(Long trainingId) {
        return physicalTrainingRepo.findById(trainingId);
    }

    @Override
    public List<PhysicalTraining> getAllPhysicalTrainings() {
        return physicalTrainingRepo.findAll();
    }

    @Override
    public PhysicalTraining updatePhysicalTraining(Long trainingId, PhysicalTraining updatedTraining) {
        Optional<PhysicalTraining> optionalTraining = physicalTrainingRepo.findById(trainingId);
        if (optionalTraining.isPresent()) {
            updatedTraining.setPhysicalTrainingId(trainingId);
            return physicalTrainingRepo.save(updatedTraining);
        } else {
            return null;
        }
    }

    @Override
    public PhysicalTraining deletePhysicalTraining(Long trainingId) {
        Optional<PhysicalTraining> trainingOptional = physicalTrainingRepo.findById(trainingId);
        if (trainingOptional.isPresent()) {
            PhysicalTraining training = trainingOptional.get();

            // Check if the training is referenced in any request
            if (physicalTrainingRequestRepo.existsByPhysicalTrainingId(trainingId)) {
                throw new TrainingDeletionException("Training cannot be deleted as it is referenced in a request.");
            }

            physicalTrainingRepo.deleteById(trainingId);
            return training;
        } else {
            return null;
        }
    }
}
