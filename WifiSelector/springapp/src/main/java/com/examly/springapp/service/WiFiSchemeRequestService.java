package com.examly.springapp.service;

import com.examly.springapp.model.WiFiSchemeRequest;

import java.util.List;
import java.util.Optional;

public interface WiFiSchemeRequestService {
    WiFiSchemeRequest addWiFiSchemeRequest(WiFiSchemeRequest request);
    Optional<WiFiSchemeRequest> getWiFiSchemeRequestById(Long wifiSchemeRequestId); 
    List<WiFiSchemeRequest> getAllWiFiSchemeRequests();
    WiFiSchemeRequest updateWiFiSchemeRequest(Long wifiSchemeRequestId, WiFiSchemeRequest request); ]
    boolean deleteWiFiSchemeRequest(Long wifiSchemeRequestId);
    List<WiFiSchemeRequest> getWiFiSchemeRequestsByUserId(Long userId);
}
