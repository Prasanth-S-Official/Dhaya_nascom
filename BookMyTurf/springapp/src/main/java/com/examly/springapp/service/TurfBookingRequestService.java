package com.examly.springapp.service;

import com.examly.springapp.model.TurfBookingRequest;

import java.util.List;
import java.util.Optional;

public interface TurfBookingRequestService {
    TurfBookingRequest addTurfBookingRequest(TurfBookingRequest turfBookingRequest);
    Optional<TurfBookingRequest> getTurfBookingRequestById(Long turfBookingRequestId);
    List<TurfBookingRequest> getAllTurfBookingRequests();
    TurfBookingRequest updateTurfBookingRequest(Long turfBookingRequestId, TurfBookingRequest turfBookingRequest);
    TurfBookingRequest deleteTurfBookingRequest(Long turfBookingRequestId);
    List<TurfBookingRequest> findTurfBookingRequestsByUserId(Long userId);
    List<TurfBookingRequest> findTurfBookingRequestsByTurfId(Long turfId);
}
