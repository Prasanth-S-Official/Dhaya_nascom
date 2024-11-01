package com.examly.springapp.service;

import com.examly.springapp.model.PhysicalTrainingRequest;

import java.util.List;

public interface PhysicalTrainingRequestService {
    List<PhysicalTrainingRequest> getAllPhysicalTrainingRequests();
    List<PhysicalTrainingRequest> getPhysicalTrainingRequestsByUserId(Long userId);
    PhysicalTrainingRequest getPhysicalTrainingRequestById(Long requestId);
    PhysicalTrainingRequest addPhysicalTrainingRequest(PhysicalTrainingRequest request);
    PhysicalTrainingRequest updatePhysicalTrainingRequest(Long requestId, PhysicalTrainingRequest request);
    boolean deletePhysicalTrainingRequest(Long requestId);
}
