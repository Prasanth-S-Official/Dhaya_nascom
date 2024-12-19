package com.examly.springapp.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.service.WiFiSchemeService;
import com.examly.springapp.model.WiFiScheme;



import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/wifiScheme")
@Slf4j
public class WiFiSchemeController {

    @Autowired
    private WiFiSchemeService wifiSchemeService;

    @PostMapping
    public ResponseEntity<?> addWiFiScheme(@RequestBody WiFiScheme wifiScheme) {
        log.info("Request received to add WiFi Scheme: {}", wifiScheme.getSchemeName());
        WiFiScheme newScheme = wifiSchemeService.addWiFiScheme(wifiScheme);
        log.info("WiFi Scheme added successfully with ID: {}", newScheme.getWifiSchemeId());
        return new ResponseEntity<>(newScheme, HttpStatus.CREATED);
    }

    @GetMapping("/{wifiSchemeId}")
    public ResponseEntity<WiFiScheme> getWiFiSchemeById(@PathVariable Long wifiSchemeId) {
        log.info("Fetching WiFi Scheme with ID: {}", wifiSchemeId);
        Optional<WiFiScheme> scheme = wifiSchemeService.getWiFiSchemeById(wifiSchemeId);
        if (scheme.isPresent()) {
            log.info("WiFi Scheme found: {}", scheme.get().getSchemeName());
            return ResponseEntity.status(HttpStatus.OK).body(scheme.get());
        } else {
            log.warn("WiFi Scheme not found with ID: {}", wifiSchemeId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<WiFiScheme>> getAllWiFiSchemes() {
        log.info("Fetching all WiFi Schemes.");
        List<WiFiScheme> allSchemes = wifiSchemeService.getAllWiFiSchemes();
        log.info("Total WiFi Schemes fetched: {}", allSchemes.size());
        return ResponseEntity.status(HttpStatus.OK).body(allSchemes);
    }

    @PutMapping("/{wifiSchemeId}")
    public ResponseEntity<WiFiScheme> updateWiFiScheme(@PathVariable Long wifiSchemeId, @RequestBody WiFiScheme wifiScheme) {
        log.info("Request received to update WiFi Scheme with ID: {}", wifiSchemeId);
        WiFiScheme updatedScheme = wifiSchemeService.updateWiFiScheme(wifiSchemeId, wifiScheme);
        if (updatedScheme != null) {
            log.info("WiFi Scheme updated successfully: {}", updatedScheme.getSchemeName());
            return ResponseEntity.status(HttpStatus.OK).body(updatedScheme);
        } else {
            log.warn("WiFi Scheme not found for update with ID: {}", wifiSchemeId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{wifiSchemeId}")
    public ResponseEntity<WiFiScheme> deleteWiFiScheme(@PathVariable Long wifiSchemeId) {
        log.info("Request received to delete WiFi Scheme with ID: {}", wifiSchemeId);
        try {
            WiFiScheme deletedScheme = wifiSchemeService.deleteWiFiScheme(wifiSchemeId);
            log.info("WiFi Scheme deleted successfully: {}", deletedScheme.getSchemeName());
            return ResponseEntity.status(HttpStatus.OK).body(deletedScheme);
        } catch (Exception e) {
            log.error("Error deleting WiFi Scheme with ID: {}", wifiSchemeId, e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
