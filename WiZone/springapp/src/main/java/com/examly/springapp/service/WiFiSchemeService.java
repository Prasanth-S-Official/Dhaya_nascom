package com.examly.springapp.service;

import com.examly.springapp.model.WiFiScheme;

import java.util.List;
import java.util.Optional;

public interface WiFiSchemeService {
    WiFiScheme addWiFiScheme(WiFiScheme wifiScheme);
    Optional<WiFiScheme> getWiFiSchemeById(Long wifiSchemeId);
    List<WiFiScheme> getAllWiFiSchemes();
    WiFiScheme updateWiFiScheme(Long wifiSchemeId, WiFiScheme wifiScheme);
    WiFiScheme deleteWiFiScheme(Long wifiSchemeId);
}
