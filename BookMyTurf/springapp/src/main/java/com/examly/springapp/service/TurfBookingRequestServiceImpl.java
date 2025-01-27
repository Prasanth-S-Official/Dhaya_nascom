package com.examly.springapp.service;

import com.examly.springapp.exception.TurfBookingRequestDeletionException;
import com.examly.springapp.model.TurfBookingRequest;
import com.examly.springapp.repository.TurfBookingRequestRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TurfBookingRequestServiceImpl implements TurfBookingRequestService {

    @Autowired
    private TurfBookingRequestRepo turfBookingRequestRepo;

    @Override
    public TurfBookingRequest addTurfBookingRequest(TurfBookingRequest turfBookingRequest) {
        return turfBookingRequestRepo.save(turfBookingRequest);
    }

    @Override
    public Optional<TurfBookingRequest> getTurfBookingRequestById(Long turfBookingRequestId) {
        return turfBookingRequestRepo.findById(turfBookingRequestId);
    }

    @Override
    public List<TurfBookingRequest> getAllTurfBookingRequests() {
        return turfBookingRequestRepo.findAll();
    }

    @Override
    public TurfBookingRequest updateTurfBookingRequest(Long turfBookingRequestId, TurfBookingRequest turfBookingRequest) {
        if (turfBookingRequestRepo.existsById(turfBookingRequestId)) {
            turfBookingRequest.setBookingRequestId(turfBookingRequestId);
            return turfBookingRequestRepo.save(turfBookingRequest);
        }
        return null;
    }

    @Override
    public TurfBookingRequest deleteTurfBookingRequest(Long turfBookingRequestId) {
        Optional<TurfBookingRequest> existingRequest = turfBookingRequestRepo.findById(turfBookingRequestId);
        if (existingRequest.isPresent()) {
            turfBookingRequestRepo.deleteById(turfBookingRequestId);
            return existingRequest.get();
        } else {
            throw new TurfBookingRequestDeletionException("TurfBookingRequest not found for deletion.");
        }
    }

    @Override
    public List<TurfBookingRequest> findTurfBookingRequestsByUserId(Long userId) {
        return turfBookingRequestRepo.findByUserId(userId);
    }

    @Override
    public List<TurfBookingRequest> findTurfBookingRequestsByTurfId(Long turfId) {
        return turfBookingRequestRepo.findByTurfId(turfId);
    }
}
