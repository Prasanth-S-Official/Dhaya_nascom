package com.examly.springapp.controller;

import com.examly.springapp.model.MaterialRequest;
import com.examly.springapp.service.MaterialRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/materialRequest")
public class MaterialRequestController {

    @Autowired
    private MaterialRequestService materialRequestService;

    @PostMapping
    public ResponseEntity<?> addMaterialRequest(@RequestBody MaterialRequest materialRequest) {
        MaterialRequest newRequest = materialRequestService.addMaterialRequest(materialRequest);
        return new ResponseEntity<>(newRequest, HttpStatus.CREATED);
    }

    @GetMapping("/{materialRequestId}")
    public ResponseEntity<MaterialRequest> getMaterialRequestById(@PathVariable Long materialRequestId) {
        Optional<MaterialRequest> request = materialRequestService.getMaterialRequestById(materialRequestId);
        return request.map(value -> ResponseEntity.status(HttpStatus.OK).body(value))
                      .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<MaterialRequest>> getMaterialRequestsByUserId(@PathVariable Long userId) {
        List<MaterialRequest> userRequests = materialRequestService.getMaterialRequestsByUserId(userId);
        if (!userRequests.isEmpty()) {
            return ResponseEntity.status(HttpStatus.OK).body(userRequests);
        } else {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<MaterialRequest>> getAllMaterialRequests() {
        List<MaterialRequest> allRequests = materialRequestService.getAllMaterialRequests();
        return ResponseEntity.status(HttpStatus.OK).body(allRequests);
    }

    @PutMapping("/{materialRequestId}")
    public ResponseEntity<MaterialRequest> updateMaterialRequest(@PathVariable Long materialRequestId, @RequestBody MaterialRequest materialRequest) {
        MaterialRequest updatedRequest = materialRequestService.updateMaterialRequest(materialRequestId, materialRequest);
        if (updatedRequest != null) {
            return ResponseEntity.status(HttpStatus.OK).body(updatedRequest);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{materialRequestId}")
    public ResponseEntity<MaterialRequest> deleteMaterialRequest(@PathVariable Long materialRequestId) {
        boolean isDeleted = materialRequestService.deleteMaterialRequest(materialRequestId);
        if (isDeleted) {
            return ResponseEntity.status(HttpStatus.OK).build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/admin/insights")
    public ResponseEntity<?> getAllUserInsights() {
        List<Map<String, Object>> allUserInsights = materialRequestService.getAllUserInsights();
        return ResponseEntity.ok(allUserInsights);
    }
}
