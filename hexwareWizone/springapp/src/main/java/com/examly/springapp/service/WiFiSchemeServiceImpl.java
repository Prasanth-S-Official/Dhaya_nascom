package com.examly.springapp.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.WiFiScheme;
import com.examly.springapp.repository.WiFiSchemeRepo;
import com.examly.springapp.exceptions.DuplicateWiFiSchemeException;
import com.examly.springapp.exceptions.WiFiSchemeDeletionException;


import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class WiFiSchemeServiceImpl implements WiFiSchemeService {

    @Autowired
    private WiFiSchemeRepo wifiSchemeRepo;

    @Override
    public WiFiScheme addWiFiScheme(WiFiScheme wifiScheme) {
        log.info("Initiating addition of WiFi Scheme: {}", wifiScheme.getSchemeName());
        Optional<WiFiScheme> existingScheme = wifiSchemeRepo.findBySchemeName(wifiScheme.getSchemeName());
        if (existingScheme.isPresent()) {
            log.warn("Duplicate WiFi Scheme detected: {}", wifiScheme.getSchemeName());
            throw new DuplicateWiFiSchemeException("Scheme with the same name already exists.");
        }
        WiFiScheme savedScheme = wifiSchemeRepo.save(wifiScheme);
        log.info("WiFi Scheme added successfully with ID: {}", savedScheme.getWifiSchemeId());
        return savedScheme;
    }

    @Override
    public Optional<WiFiScheme> getWiFiSchemeById(Long wifiSchemeId) {
        log.info("Fetching WiFi Scheme with ID: {}", wifiSchemeId);
        return wifiSchemeRepo.findById(wifiSchemeId);
    }

    @Override
    public List<WiFiScheme> getAllWiFiSchemes() {
        log.info("Fetching all WiFi Schemes.");
        return wifiSchemeRepo.findAll();
    }

    @Override
    public WiFiScheme updateWiFiScheme(Long wifiSchemeId, WiFiScheme wifiScheme) {
        log.info("Updating WiFi Scheme with ID: {}", wifiSchemeId);
        if (wifiSchemeRepo.existsById(wifiSchemeId)) {
            wifiScheme.setWifiSchemeId(wifiSchemeId);
            WiFiScheme updatedScheme = wifiSchemeRepo.save(wifiScheme);
            log.info("WiFi Scheme updated successfully: {}", updatedScheme.getSchemeName());
            return updatedScheme;
        } else {
            log.warn("WiFi Scheme not found for update with ID: {}", wifiSchemeId);
            return null;
        }
    }

    @Override
    public WiFiScheme deleteWiFiScheme(Long wifiSchemeId) {
        log.info("Deleting WiFi Scheme with ID: {}", wifiSchemeId);
        Optional<WiFiScheme> existingScheme = wifiSchemeRepo.findById(wifiSchemeId);
        if (existingScheme.isPresent()) {
            wifiSchemeRepo.deleteById(wifiSchemeId);
            log.info("WiFi Scheme deleted successfully: {}", existingScheme.get().getSchemeName());
            return existingScheme.get();
        } else {
            log.error("WiFi Scheme not found for deletion with ID: {}", wifiSchemeId);
            throw new WiFiSchemeDeletionException("WiFi scheme not found for deletion.");
        }
    }
}
