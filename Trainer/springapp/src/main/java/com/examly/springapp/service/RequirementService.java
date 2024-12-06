package com.examly.springapp.service;

import com.examly.springapp.model.Requirement;

import java.util.List;
import java.util.Optional;

public interface RequirementService {
    Requirement addRequirement(Requirement requirement);
    Optional<Requirement> getRequirementById(Long requirementId);
    List<Requirement> getAllRequirements();
    Requirement updateRequirement(Long requirementId, Requirement requirement);
    Requirement deleteRequirement(Long requirementId);
}
