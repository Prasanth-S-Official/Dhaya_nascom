package com.examly.springapp.controller;

import com.examly.springapp.model.Requirement;
import com.examly.springapp.service.RequirementService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/requirement")
public class RequirementController {

    @Autowired
    private RequirementService requirementService;

    @PostMapping
    public ResponseEntity<?> addRequirement(@RequestBody Requirement requirement) {
        try {
            Requirement newRequirement = requirementService.addRequirement(requirement);
            return new ResponseEntity<>(newRequirement, HttpStatus.CREATED);
        } catch (IllegalArgumentException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    

    @GetMapping("/{requirementId}")
    public ResponseEntity<Requirement> getRequirementById(@PathVariable Long requirementId) {
        Optional<Requirement> requirement = requirementService.getRequirementById(requirementId);
        return requirement.map(value -> ResponseEntity.status(HttpStatus.OK).body(value))
                          .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping
    public ResponseEntity<List<Requirement>> getAllRequirements() {
        List<Requirement> allRequirements = requirementService.getAllRequirements();
        return ResponseEntity.status(HttpStatus.OK).body(allRequirements);
    }

    @PutMapping("/{requirementId}")
    public ResponseEntity<Requirement> updateRequirement(@PathVariable Long requirementId, @RequestBody Requirement requirement) {
        Requirement updatedRequirement = requirementService.updateRequirement(requirementId, requirement);
        if (updatedRequirement != null) {
            return ResponseEntity.status(HttpStatus.OK).body(updatedRequirement);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{requirementId}")
    public ResponseEntity<Requirement> deleteRequirement(@PathVariable Long requirementId) {
        Requirement deletedRequirement = requirementService.deleteRequirement(requirementId);
        if (deletedRequirement != null) {
            return ResponseEntity.status(HttpStatus.OK).body(deletedRequirement);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/trainer/{trainerId}")
public ResponseEntity<List<Requirement>> getRequirementsByTrainerId(@PathVariable Long trainerId) {
    List<Requirement> requirements = requirementService.getRequirementsByTrainerId(trainerId);
    if (requirements.isEmpty()) {
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
    return ResponseEntity.status(HttpStatus.OK).body(requirements);
}

}
