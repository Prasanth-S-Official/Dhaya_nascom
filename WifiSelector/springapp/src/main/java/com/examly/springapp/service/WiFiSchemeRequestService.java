package com.examly.springapp.service;

import com.examly.springapp.model.WiFiSchemeRequest;

import java.util.List;
import java.util.Optional;

public interface WiFiSchemeRequestService {
    WiFiSchemeRequest addWiFiSchemeRequest(WiFiSchemeRequest request);
    Optional<WiFiSchemeRequest> getWiFiSchemeRequestById(Long requestId);
    List<WiFiSchemeRequest> getAllWiFiSchemeRequests();
    WiFiSchemeRequest updateWiFiSchemeRequest(Long requestId, WiFiSchemeRequest request);
    boolean deleteWiFiSchemeRequest(Long requestId);
    List<WiFiSchemeRequest> getWiFiSchemeRequestsByUserId(Long userId);

}
