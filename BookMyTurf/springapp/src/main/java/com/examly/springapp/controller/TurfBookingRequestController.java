package com.examly.springapp.controller;

import com.examly.springapp.model.TurfBookingRequest;
import com.examly.springapp.service.TurfBookingRequestService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/turfBookingRequest")
public class TurfBookingRequestController {

    @Autowired
    private TurfBookingRequestService turfBookingRequestService;

    @PostMapping
    public ResponseEntity<TurfBookingRequest> addTurfBookingRequest(@RequestBody TurfBookingRequest turfBookingRequest) {
        TurfBookingRequest newTurfBookingRequest = turfBookingRequestService.addTurfBookingRequest(turfBookingRequest);
        return new ResponseEntity<>(newTurfBookingRequest, HttpStatus.CREATED); // 201 Created
    }

    @GetMapping("/{turfBookingRequestId}")
    public ResponseEntity<TurfBookingRequest> getTurfBookingRequestById(@PathVariable Long turfBookingRequestId) {
        Optional<TurfBookingRequest> turfBookingRequest = turfBookingRequestService.getTurfBookingRequestById(turfBookingRequestId);
        return turfBookingRequest.map(value -> ResponseEntity.status(HttpStatus.OK).body(value)) // 200 OK
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build()); // 404 Not Found
    }

    @GetMapping
    public ResponseEntity<List<TurfBookingRequest>> getAllTurfBookingRequests() {
        List<TurfBookingRequest> allRequests = turfBookingRequestService.getAllTurfBookingRequests();
        return ResponseEntity.status(HttpStatus.OK).body(allRequests); // 200 OK
    }

    @PutMapping("/{turfBookingRequestId}")
    public ResponseEntity<TurfBookingRequest> updateTurfBookingRequest(@PathVariable Long turfBookingRequestId, @RequestBody TurfBookingRequest turfBookingRequest) {
        TurfBookingRequest updatedRequest = turfBookingRequestService.updateTurfBookingRequest(turfBookingRequestId, turfBookingRequest);
        if (updatedRequest != null) {
            return ResponseEntity.status(HttpStatus.OK).body(updatedRequest); // 200 OK
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 404 Not Found
        }
    }

    @DeleteMapping("/{turfBookingRequestId}")
    public ResponseEntity<TurfBookingRequest> deleteTurfBookingRequest(@PathVariable Long turfBookingRequestId) {
        TurfBookingRequest deletedRequest = turfBookingRequestService.deleteTurfBookingRequest(turfBookingRequestId);
        if (deletedRequest != null) {
            return ResponseEntity.status(HttpStatus.OK).body(deletedRequest); // 200 OK
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 404 Not Found
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TurfBookingRequest>> findTurfBookingRequestsByUserId(@PathVariable Long userId) {
        List<TurfBookingRequest> requests = turfBookingRequestService.findTurfBookingRequestsByUserId(userId);
        if (requests.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build(); // 204 No Content
        }
        return ResponseEntity.status(HttpStatus.OK).body(requests); // 200 OK
    }

    @GetMapping("/turf/{turfId}")
    public ResponseEntity<List<TurfBookingRequest>> findTurfBookingRequestsByTurfId(@PathVariable Long turfId) {
        List<TurfBookingRequest> requests = turfBookingRequestService.findTurfBookingRequestsByTurfId(turfId);
        if (requests.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build(); // 204 No Content
        }
        return ResponseEntity.status(HttpStatus.OK).body(requests); // 200 OK
    }
}
