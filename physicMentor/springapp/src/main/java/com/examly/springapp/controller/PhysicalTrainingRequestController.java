package com.examly.springapp.controller;

import com.examly.springapp.exceptions.PhysicalTrainingException;
import com.examly.springapp.model.PhysicalTrainingRequest;
import com.examly.springapp.service.PhysicalTrainingRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/physicalTrainingRequests")
public class PhysicalTrainingRequestController {

    @Autowired
    private PhysicalTrainingRequestService requestService;

    @GetMapping
    public ResponseEntity<List<PhysicalTrainingRequest>> getAllRequests() {
        List<PhysicalTrainingRequest> requests = requestService.getAllPhysicalTrainingRequests();
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PhysicalTrainingRequest>> getRequestsByUserId(@PathVariable Long userId) {
        List<PhysicalTrainingRequest> requests = requestService.getPhysicalTrainingRequestsByUserId(userId);
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PhysicalTrainingRequest> getRequestById(@PathVariable Long id) {
        PhysicalTrainingRequest request = requestService.getPhysicalTrainingRequestById(id);
        if (request != null) {
            return ResponseEntity.ok(request);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<PhysicalTrainingRequest> addRequest(@RequestBody PhysicalTrainingRequest request) {
        try {
            PhysicalTrainingRequest addedRequest = requestService.addPhysicalTrainingRequest(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(addedRequest);
        } catch (PhysicalTrainingException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<PhysicalTrainingRequest> updateRequest(@PathVariable Long id, @RequestBody PhysicalTrainingRequest request) {
        PhysicalTrainingRequest updatedRequest = requestService.updatePhysicalTrainingRequest(id, request);
        if (updatedRequest != null) {
            return ResponseEntity.ok(updatedRequest);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRequest(@PathVariable Long id) {
        boolean deleted = requestService.deletePhysicalTrainingRequest(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
