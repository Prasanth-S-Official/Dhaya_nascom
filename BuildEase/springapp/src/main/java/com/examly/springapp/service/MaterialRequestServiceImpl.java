package com.examly.springapp.service;

import com.examly.springapp.exceptions.MaterialRequestException;
import com.examly.springapp.model.MaterialRequest;
import com.examly.springapp.repository.MaterialRequestRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MaterialRequestServiceImpl implements MaterialRequestService {

    @Autowired
    private MaterialRequestRepo materialRequestRepo;

    @Override
    public MaterialRequest addMaterialRequest(MaterialRequest request) {
        Long userId = request.getUser().getUserId();
        Long materialId = request.getMaterial().getMaterialId();
        Optional<MaterialRequest> existingRequest = materialRequestRepo.findByUser_UserIdAndMaterial_MaterialId(userId, materialId);
        if (existingRequest.isPresent()) {
            throw new MaterialRequestException("User has already requested this material.");
        }
        return materialRequestRepo.save(request);
    }

    @Override
    public List<MaterialRequest> getMaterialRequestsByUserId(Long userId) {
        return materialRequestRepo.findMaterialRequestsByUserId(userId);
    }

    @Override
    public Optional<MaterialRequest> getMaterialRequestById(Long requestId) {
        return materialRequestRepo.findById(requestId);
    }

    @Override
    public List<MaterialRequest> getAllMaterialRequests() {
        return materialRequestRepo.findAll();
    }

    @Override
    public MaterialRequest updateMaterialRequest(Long requestId, MaterialRequest request) {
        Optional<MaterialRequest> existingRequest = materialRequestRepo.findById(requestId);
        if (existingRequest.isPresent()) {
            request.setMaterialRequestId(requestId);
            return materialRequestRepo.save(request);
        }
        return null;
    }

    @Override
    public boolean deleteMaterialRequest(Long requestId) {
        Optional<MaterialRequest> existingRequest = materialRequestRepo.findById(requestId);
        if (existingRequest.isPresent()) {
            materialRequestRepo.deleteById(requestId);
            return true;
        }
        return false;
    }
}
