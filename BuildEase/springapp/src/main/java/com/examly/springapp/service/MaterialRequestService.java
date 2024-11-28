package com.examly.springapp.service;

import com.examly.springapp.model.MaterialRequest;

import java.util.List;
import java.util.Optional;

public interface MaterialRequestService {
    MaterialRequest addMaterialRequest(MaterialRequest request);
    Optional<MaterialRequest> getMaterialRequestById(Long requestId);
    List<MaterialRequest> getAllMaterialRequests();
    MaterialRequest updateMaterialRequest(Long requestId, MaterialRequest request);
    boolean deleteMaterialRequest(Long requestId);
    List<MaterialRequest> getMaterialRequestsByUserId(Long userId);
}
