package com.examly.springapp.service;

import com.examly.springapp.exceptions.WiFiSchemeRequestException;
import com.examly.springapp.model.WiFiSchemeRequest;
import com.examly.springapp.repository.WiFiSchemeRequestRepo;

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
        Long userId = Long.valueOf(request.getUser().getUserId());
        Long schemeId = request.getWifiScheme().getWifiSchemeId();        
        Optional<WiFiSchemeRequest> existingRequest = wifiSchemeRequestRepo.findByUser_UserIdAndWifiScheme_WifiSchemeId(userId, schemeId);
        if (existingRequest.isPresent()) {
            throw new WiFiSchemeRequestException("User has already requested this WiFi scheme.");
        }
        return wifiSchemeRequestRepo.save(request);
    }

    @Override
public List<WiFiSchemeRequest> getWiFiSchemeRequestsByUserId(Long userId) {
    return wifiSchemeRequestRepo.findWiFiSchemeRequestsByUserId(userId);
}


    @Override
    public Optional<WiFiSchemeRequest> getWiFiSchemeRequestById(Long wifiSchemeRequestId) {
        return wifiSchemeRequestRepo.findById(wifiSchemeRequestId);
    }


    @Override
    public List<WiFiSchemeRequest> getAllWiFiSchemeRequests() {
        return wifiSchemeRequestRepo.findAll();
    }

    @Override
    public WiFiSchemeRequest updateWiFiSchemeRequest(Long wifiSchemeRequestId, WiFiSchemeRequest request) {
        Optional<WiFiSchemeRequest> existingRequest = wifiSchemeRequestRepo.findById(wifiSchemeRequestId);
        if (existingRequest.isPresent()) {
            request.setWifiSchemeRequestId(wifiSchemeRequestId);
            return wifiSchemeRequestRepo.save(request);
        }
        return null;
    }

    @Override
    public boolean deleteWiFiSchemeRequest(Long wifiSchemeRequestId) {
        Optional<WiFiSchemeRequest> existingRequest = wifiSchemeRequestRepo.findById(wifiSchemeRequestId);
        if (existingRequest.isPresent()) {
            wifiSchemeRequestRepo.deleteById(wifiSchemeRequestId);
            return true;
        }
        return false;
    }
}
