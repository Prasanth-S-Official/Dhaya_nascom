package com.examly.springapp.service;

import com.examly.springapp.exceptions.DuplicateRequirementException;
import com.examly.springapp.exceptions.RequirementDeletionException;
import com.examly.springapp.model.Requirement;
import com.examly.springapp.repository.RequirementRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RequirementServiceImpl implements RequirementService {

    @Autowired
    private RequirementRepo requirementRepo;

    @Override
    public Requirement addRequirement(Requirement requirement) {
        Optional<Requirement> existingRequirement = requirementRepo.findByTitle(requirement.getTitle());
        if (existingRequirement.isPresent()) {
            throw new DuplicateRequirementException("Requirement with the same title already exists.");
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
