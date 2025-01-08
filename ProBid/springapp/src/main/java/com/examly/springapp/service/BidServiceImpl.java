package com.examly.springapp.service;

import com.examly.springapp.exceptions.MaterialRequestException;
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

@Service
public class BidServiceImpl implements BidService {

    @Autowired
    private MaterialRequestRepo materialRequestRepo;

    @Autowired
    private UserRepo userRepo;

    @Override
    public MaterialRequest addMaterialRequest(MaterialRequest materialRequest) {
        Long userId = materialRequest.getUser().getUserId();
        Long materialId = materialRequest.getMaterial().getMaterialId();
        Optional<MaterialRequest> existingRequest = materialRequestRepo.findByUser_UserIdAndMaterial_MaterialId(userId, materialId);
        if (existingRequest.isPresent()) {
            throw new MaterialRequestException("User has already requested this material.");
        }
        return materialRequestRepo.save(materialRequest);
    }

    @Override
    public List<MaterialRequest> getMaterialRequestsByUserId(Long userId) {
        return materialRequestRepo.findMaterialRequestsByUserId(userId);
    }

    @Override
    public Optional<MaterialRequest> getMaterialRequestById(Long materialRequestId) {
        return materialRequestRepo.findById(materialRequestId);
    }

    @Override
    public List<MaterialRequest> getAllMaterialRequests() {
        return materialRequestRepo.findAll();
    }

    @Override
    public MaterialRequest updateMaterialRequest(Long materialRequestId, MaterialRequest materialRequest) {
        Optional<MaterialRequest> existingRequest = materialRequestRepo.findById(materialRequestId);
        if (existingRequest.isPresent()) {
            materialRequest.setMaterialRequestId(materialRequestId);
            return materialRequestRepo.save(materialRequest);
        }
        return null;
    }

    @Override
    public boolean deleteMaterialRequest(Long materialRequestId) {
        Optional<MaterialRequest> existingRequest = materialRequestRepo.findById(materialRequestId);
        if (existingRequest.isPresent()) {
            materialRequestRepo.deleteById(materialRequestId);
            return true;
        }
        return false;
    }

    @Override
    public List<Map<String, Object>> getAllUserInsights() {
        List<User> users = userRepo.findAll();
        List<Map<String, Object>> allUserInsights = new ArrayList<>();

        for (User user : users) {
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
            userInsights.put("orders", userRequests);

            allUserInsights.add(userInsights);
        }

        return allUserInsights;
    }
}
