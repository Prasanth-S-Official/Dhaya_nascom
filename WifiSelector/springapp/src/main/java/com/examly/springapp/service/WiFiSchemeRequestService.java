package com.examly.springapp.service;

import com.examly.springapp.model.WiFiSchemeRequest;

import java.util.List;
import java.util.Optional;

public interface WiFiSchemeRequestService {
    WiFiSchemeRequest addWiFiSchemeRequest(WiFiSchemeRequest wiFiSchemeRequest);
    Optional<WiFiSchemeRequest> getWiFiSchemeRequestById(Long wifiSchemeRequestId); 
    List<WiFiSchemeRequest> getAllWiFiSchemeRequests();
    WiFiSchemeRequest updateWiFiSchemeRequest(Long wifiSchemeRequestId, WiFiSchemeRequest wiFiSchemeRequest); 
    boolean deleteWiFiSchemeRequest(Long wifiSchemeRequestId);
    List<WiFiSchemeRequest> getWiFiSchemeRequestsByUserId(Long userId);
}
