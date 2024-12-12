package com.examly.springapp.controller;

import com.examly.springapp.model.WiFiSchemeRequest;
import com.examly.springapp.service.WiFiSchemeRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/wifiSchemeRequest")
public class WiFiSchemeRequestController {

    @Autowired
    private WiFiSchemeRequestService wifiSchemeRequestService;

    @PostMapping
    public ResponseEntity<?> addWiFiSchemeRequest(@RequestBody WiFiSchemeRequest wifiSchemeRequest) {
        WiFiSchemeRequest newRequest = wifiSchemeRequestService.addWiFiSchemeRequest(wifiSchemeRequest);
        return new ResponseEntity<>(newRequest, HttpStatus.CREATED);
    }

    @GetMapping("/{wifiSchemeRequestId}")
    public ResponseEntity<WiFiSchemeRequest> getWiFiSchemeRequestById(@PathVariable Long wifiSchemeRequestId) {
        Optional<WiFiSchemeRequest> request = wifiSchemeRequestService.getWiFiSchemeRequestById(wifiSchemeRequestId);
        return request.map(value -> ResponseEntity.status(HttpStatus.OK).body(value))
                      .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/user/{userId}")
public ResponseEntity<List<WiFiSchemeRequest>> getWiFiSchemeRequestsByUserId(@PathVariable Long userId) {
    List<WiFiSchemeRequest> userRequests = wifiSchemeRequestService.getWiFiSchemeRequestsByUserId(userId);
    if (!userRequests.isEmpty()) {
        return ResponseEntity.status(HttpStatus.OK).body(userRequests);
    } else {
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}


    @GetMapping
    public ResponseEntity<List<WiFiSchemeRequest>> getAllWiFiSchemeRequests() {
        List<WiFiSchemeRequest> allRequests = wifiSchemeRequestService.getAllWiFiSchemeRequests();
        return ResponseEntity.status(HttpStatus.OK).body(allRequests);
    }

    @PutMapping("/{wifiSchemeRequestId}")
    public ResponseEntity<WiFiSchemeRequest> updateWiFiSchemeRequest(@PathVariable Long wifiSchemeRequestId, @RequestBody WiFiSchemeRequest wifiSchemeRequest) {
        WiFiSchemeRequest updatedRequest = wifiSchemeRequestService.updateWiFiSchemeRequest(wifiSchemeRequestId, wifiSchemeRequest);
        if (updatedRequest != null) {
            return ResponseEntity.status(HttpStatus.OK).body(updatedRequest);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{wifiSchemeRequestId}")
    public ResponseEntity<WiFiSchemeRequest> deleteWiFiSchemeRequest(@PathVariable Long wifiSchemeRequestId) {
        boolean isDeleted = wifiSchemeRequestService.deleteWiFiSchemeRequest(wifiSchemeRequestId);
        if (isDeleted) {
            return ResponseEntity.status(HttpStatus.OK).build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
