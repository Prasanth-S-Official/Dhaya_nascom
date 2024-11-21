package com.examly.springapp.service;

import com.examly.springapp.model.WiFiScheme;
import com.examly.springapp.repository.WiFiSchemeRepo;

import main.java.com.examly.springapp.exceptions.DuplicateWiFiSchemeException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WiFiSchemeServiceImpl implements WiFiSchemeService {

    @Autowired
    private WiFiSchemeRepo wifiSchemeRepo;

    @Override
    public WiFiScheme addWiFiScheme(WiFiScheme wifiScheme) {
        Optional<WiFiScheme> existingScheme = wifiSchemeRepo.findBySchemeName(wifiScheme.getSchemeName());
        if (existingScheme.isPresent()) {
            throw new DuplicateWiFiSchemeException("Scheme with the same name already exists.");
        }
        return wifiSchemeRepo.save(wifiScheme);
    }


    @Override
    public Optional<WiFiScheme> getWiFiSchemeById(Long wifiSchemeId) {
        return wifiSchemeRepo.findById(wifiSchemeId);
    }

    @Override
    public List<WiFiScheme> getAllWiFiSchemes() {
        return wifiSchemeRepo.findAll();
    }

    @Override
    public WiFiScheme updateWiFiScheme(Long wifiSchemeId, WiFiScheme wifiScheme) {
        if (wifiSchemeRepo.existsById(wifiSchemeId)) {
            wifiScheme.setWifiSchemeId(wifiSchemeId);
            return wifiSchemeRepo.save(wifiScheme);
        }
        return null;
    }

    @Override
    public WiFiScheme deleteWiFiScheme(Long wifiSchemeId) {
        Optional<WiFiScheme> existingScheme = wifiSchemeRepo.findById(wifiSchemeId);
        if (existingScheme.isPresent()) {
            wifiSchemeRepo.deleteById(wifiSchemeId);
            return existingScheme.get();
        } else {
            throw new WiFiSchemeDeletionException("WiFi scheme not found for deletion.");
        }
    }
    
}
