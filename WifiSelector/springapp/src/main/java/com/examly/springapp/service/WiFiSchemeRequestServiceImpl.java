package com.examly.springapp.service;

import com.examly.springapp.model.WiFiSchemeRequest;
import com.examly.springapp.repository.WiFiSchemeRequestRepo;

import main.java.com.examly.springapp.exceptions.WiFiSchemeRequestException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WiFiSchemeRequestServiceImpl implements WiFiSchemeRequestService {

    @Autowired
    private WiFiSchemeRequestRepo wifiSchemeRequestRepo;

   @Override
    public WiFiSchemeRequest addWiFiSchemeRequest(WiFiSchemeRequest request) {
        Long userId = request.getUser().getUserId();
        Long schemeId = request.getWifiScheme().getWifiSchemeId();
        Optional<WiFiSchemeRequest> existingRequest = wifiSchemeRequestRepo.findByUser_UserIdAndWifiScheme_WifiSchemeId(userId, schemeId);
        if (existingRequest.isPresent()) {
            throw new WiFiSchemeRequestException("User has already requested this WiFi scheme.");
        }
        return wifiSchemeRequestRepo.save(request);
    }


    @Override
    public Optional<WiFiSchemeRequest> getWiFiSchemeRequestById(Long requestId) {
        return wifiSchemeRequestRepo.findById(requestId);
    }

    @Override
    public List<WiFiSchemeRequest> getAllWiFiSchemeRequests() {
        return wifiSchemeRequestRepo.findAll();
    }

    @Override
    public WiFiSchemeRequest updateWiFiSchemeRequest(Long requestId, WiFiSchemeRequest request) {
        Optional<WiFiSchemeRequest> existingRequest = wifiSchemeRequestRepo.findById(requestId);
        if (existingRequest.isPresent()) {
            request.setWifiSchemeRequestId(requestId);
            return wifiSchemeRequestRepo.save(request);
        }
        return null;
    }

    @Override
    public boolean deleteWiFiSchemeRequest(Long requestId) {
        Optional<WiFiSchemeRequest> existingRequest = wifiSchemeRequestRepo.findById(requestId);
        if (existingRequest.isPresent()) {
            wifiSchemeRequestRepo.deleteById(requestId);
            return true;
        }
        return false;
    }
}
