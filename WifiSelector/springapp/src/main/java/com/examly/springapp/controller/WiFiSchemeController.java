package com.examly.springapp.controller;

import com.examly.springapp.model.WiFiScheme;
import com.examly.springapp.service.WiFiSchemeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/wifiScheme")
public class WiFiSchemeController {

    @Autowired
    private WiFiSchemeService wifiSchemeService;

    @PostMapping
    public ResponseEntity<?> addWiFiScheme(@RequestBody WiFiScheme wifiScheme) {
        WiFiScheme newScheme = wifiSchemeService.addWiFiScheme(wifiScheme);
        return new ResponseEntity<>(newScheme, HttpStatus.CREATED);
    }

    @GetMapping("/{wifiSchemeId}")
    public ResponseEntity<WiFiScheme> getWiFiSchemeById(@PathVariable Long wifiSchemeId) {
        Optional<WiFiScheme> scheme = wifiSchemeService.getWiFiSchemeById(wifiSchemeId);
        return scheme.map(value -> ResponseEntity.status(HttpStatus.OK).body(value))
                     .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping
    public ResponseEntity<List<WiFiScheme>> getAllWiFiSchemes() {
        List<WiFiScheme> allSchemes = wifiSchemeService.getAllWiFiSchemes();
        return ResponseEntity.status(HttpStatus.OK).body(allSchemes);
    }

    @PutMapping("/{wifiSchemeId}")
    public ResponseEntity<WiFiScheme> updateWiFiScheme(@PathVariable Long wifiSchemeId, @RequestBody WiFiScheme wifiScheme) {
        WiFiScheme updatedScheme = wifiSchemeService.updateWiFiScheme(wifiSchemeId, wifiScheme);
        if (updatedScheme != null) {
            return ResponseEntity.status(HttpStatus.OK).body(updatedScheme);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{wifiSchemeId}")
    public ResponseEntity<WiFiScheme> deleteWiFiScheme(@PathVariable Long wifiSchemeId) {
        WiFiScheme deletedScheme = wifiSchemeService.deleteWiFiScheme(wifiSchemeId);
        if (deletedScheme != null) {
            return ResponseEntity.status(HttpStatus.OK).body(deletedScheme);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
