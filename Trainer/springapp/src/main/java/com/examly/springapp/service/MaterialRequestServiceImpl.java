package com.examly.springapp.service;

import com.examly.springapp.exceptions.DuplicateTrainerException;
import com.examly.springapp.model.MaterialRequest;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.MaterialRequestRepo;
import com.examly.springapp.repository.UserRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.*;

@Service
public class MaterialRequestServiceImpl implements MaterialRequestService {

    @Autowired
    private MaterialRequestRepo materialRequestRepo;

    @Autowired
    private UserRepo userRepo;

    @Override
    public MaterialRequest addMaterialRequest(MaterialRequest request) {
        Long userId = request.getUser().getUserId();
        Long materialId = request.getMaterial().getMaterialId();
        Optional<MaterialRequest> existingRequest = materialRequestRepo.findByUser_UserIdAndMaterial_MaterialId(userId, materialId);
        if (existingRequest.isPresent()) {
            throw new DuplicateTrainerException("User has already requested this material.");
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

    @Override
    public List<Map<String, Object>> getAllUserInsights() {
        List<User> users = userRepo.findAll(); // Fetch all users
        List<Map<String, Object>> allUserInsights = new ArrayList<>();
    
        for (User user : users) {
            // Skip users with the "Admin" role
            if ("Admin".equalsIgnoreCase(user.getUserRole())) {
                continue;
            }
    
            List<MaterialRequest> userRequests = materialRequestRepo.findMaterialRequestsByUserId(user.getUserId());
    
            Map<String, Object> userInsights = new HashMap<>();
            userInsights.put("userId", user.getUserId());
            userInsights.put("username", user.getUsername());
            userInsights.put("email", user.getEmail());
            userInsights.put("totalRequests", userRequests.size());
            userInsights.put("highUrgencyRequests",
                    userRequests.stream().filter(req -> "High".equalsIgnoreCase(req.getUrgencyLevel())).count());
            userInsights.put("pendingRequests",
                    userRequests.stream().filter(req -> "Pending".equalsIgnoreCase(req.getStatus())).count());
            userInsights.put("orders", userRequests); // Add all orders for the user
    
            allUserInsights.add(userInsights);
        }
    
        return allUserInsights;
    }
    

    
}
