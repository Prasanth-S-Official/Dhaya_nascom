package com.examly.springapp.service;

import com.examly.springapp.model.MaterialRequest;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface BidService {
    MaterialRequest addMaterialRequest(MaterialRequest materialRequest);
    Optional<MaterialRequest> getMaterialRequestById(Long materialRequestId);
    List<MaterialRequest> getAllMaterialRequests();
    MaterialRequest updateMaterialRequest(Long materialRequestId, MaterialRequest materialRequest);
    boolean deleteMaterialRequest(Long materialRequestId);
    List<MaterialRequest> getMaterialRequestsByUserId(Long userId);
    List<Map<String, Object>> getAllUserInsights();
}