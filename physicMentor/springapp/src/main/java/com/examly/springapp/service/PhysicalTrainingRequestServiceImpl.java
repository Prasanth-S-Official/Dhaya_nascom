package com.examly.springapp.service;

import com.examly.springapp.exceptions.PhysicalTrainingException;
import com.examly.springapp.model.PhysicalTrainingRequest;
import com.examly.springapp.repository.PhysicalTrainingRequestRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PhysicalTrainingRequestServiceImpl implements PhysicalTrainingRequestService {

    @Autowired
    private PhysicalTrainingRequestRepo trainingRequestRepo;

    @Override
    public List<PhysicalTrainingRequest> getAllPhysicalTrainingRequests() {
        return trainingRequestRepo.findAll();
    }

    @Override
    public List<PhysicalTrainingRequest> getPhysicalTrainingRequestsByUserId(Long userId) {
        return trainingRequestRepo.findPhysicalTrainingRequestsByUserId(userId);
    }

    @Override
    public PhysicalTrainingRequest getPhysicalTrainingRequestById(Long requestId) {
        return trainingRequestRepo.findById(requestId).orElse(null);
    }

    @Override
    public PhysicalTrainingRequest addPhysicalTrainingRequest(PhysicalTrainingRequest request) {
        Optional<PhysicalTrainingRequest> existingRequest = trainingRequestRepo.findByUserIdAndPhysicalTrainingId(request.getUser().getUserId(), request.getPhysicalTraining().getPhysicalTrainingId());
        if (existingRequest.isPresent()) {
            throw new PhysicalTrainingException("User already requested this training");
        }
        return trainingRequestRepo.save(request);
    }

    @Override
    public PhysicalTrainingRequest updatePhysicalTrainingRequest(Long requestId, PhysicalTrainingRequest request) {
        Optional<PhysicalTrainingRequest> existingRequest = trainingRequestRepo.findById(requestId);
        if (existingRequest.isPresent()) {
            request.setPhysicalTrainingRequestId(requestId);
            return trainingRequestRepo.save(request);
        } else {
            return null;
        }
    }

    @Override
    public boolean deletePhysicalTrainingRequest(Long requestId) {
        Optional<PhysicalTrainingRequest> existingRequest = trainingRequestRepo.findById(requestId);
        if (existingRequest.isPresent()) {
            trainingRequestRepo.deleteById(requestId);
            return true;
        } else {
            return false;
        }
    }
}
