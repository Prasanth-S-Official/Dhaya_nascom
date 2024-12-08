package com.examly.springapp.service;

import com.examly.springapp.exceptions.DuplicateRequirementException;
import com.examly.springapp.exceptions.RequirementDeletionException;
import com.examly.springapp.model.Requirement;
import com.examly.springapp.repository.RequirementRepo;
import com.examly.springapp.repository.TrainerRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RequirementServiceImpl implements RequirementService {

    @Autowired
    private RequirementRepo requirementRepo;

    @Autowired
    private TrainerRepo trainerRepo;

    @Override
    public Requirement addRequirement(Requirement requirement) {
        // Optional: Check for duplicate requirements by title
        Optional<Requirement> existingRequirement = requirementRepo.findByTitle(requirement.getTitle());
        if (existingRequirement.isPresent()) {
            throw new DuplicateRequirementException("Requirement with the same title already exists.");
        }
    
        // Handle cases where the trainer is optional (can be null)
        if (requirement.getTrainer() != null && !trainerRepo.existsById(requirement.getTrainer().getTrainerId())) {
            throw new IllegalArgumentException("Trainer with ID " + requirement.getTrainer().getTrainerId() + " does not exist.");
        }
    
        return requirementRepo.save(requirement);
    }
    

    @Override
    public Optional<Requirement> getRequirementById(Long requirementId) {
        return requirementRepo.findById(requirementId);
    }

    @Override
    public List<Requirement> getAllRequirements() {
        return requirementRepo.findAll();
    }

    @Override
    public Requirement updateRequirement(Long requirementId, Requirement requirement) {
        if (requirementRepo.existsById(requirementId)) {
            requirement.setRequirementId(requirementId);
            return requirementRepo.save(requirement);
        }
        return null;
    }

    @Override
    public Requirement deleteRequirement(Long requirementId) {
        Optional<Requirement> existingRequirement = requirementRepo.findById(requirementId);
        if (existingRequirement.isPresent()) {
            requirementRepo.deleteById(requirementId);
            return existingRequirement.get();
        } else {
            throw new RequirementDeletionException("Requirement not found for deletion.");
        }
    }
}
