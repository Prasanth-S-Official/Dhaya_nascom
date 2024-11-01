package com.examly.springapp.service;

import com.examly.springapp.model.PhysicalTrainingRequest;

import java.util.List;
import java.util.Optional;

public interface PhysicalTrainingRequestService {

    List<PhysicalTrainingRequest> getAllPhysicalTrainingRequests();
    List<PhysicalTrainingRequest> getPhysicalTrainingRequestsByUserId(Long userId);
    Optional<PhysicalTrainingRequest> getPhysicalTrainingRequestById(Long requestId);
    PhysicalTrainingRequest addPhysicalTrainingRequest(PhysicalTrainingRequest request);
    PhysicalTrainingRequest updatePhysicalTrainingRequest(Long requestId, PhysicalTrainingRequest request);
    boolean deletePhysicalTrainingRequest(Long requestId);
}
