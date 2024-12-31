package com.examly.springapp.service;

import com.examly.springapp.exceptions.DriverRequestDeletionException;
import com.examly.springapp.model.DriverRequest;
import com.examly.springapp.repository.DriverRequestRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DriverRequestServiceImpl implements DriverRequestService {

    @Autowired
    private DriverRequestRepo driverRequestRepo;

    @Override
    public DriverRequest addDriverRequest(DriverRequest driverRequest) {
        return driverRequestRepo.save(driverRequest);
    }

    @Override
    public Optional<DriverRequest> getDriverRequestById(Long driverRequestId) {
        return driverRequestRepo.findById(driverRequestId);
    }

    @Override
    public List<DriverRequest> getAllDriverRequests() {
        return driverRequestRepo.findAll();
    }

    @Override
    public DriverRequest updateDriverRequest(Long driverRequestId, DriverRequest driverRequest) {
        if (driverRequestRepo.existsById(driverRequestId)) {
            driverRequest.setDriverRequestId(driverRequestId);
            return driverRequestRepo.save(driverRequest);
        }
        return null;
    }

    @Override
    public DriverRequest deleteDriverRequest(Long driverRequestId) {
        Optional<DriverRequest> existingRequest = driverRequestRepo.findById(driverRequestId);
        if (existingRequest.isPresent()) {
            driverRequestRepo.deleteById(driverRequestId);
            return existingRequest.get();
        } else {
            throw new DriverRequestDeletionException("DriverRequest not found for deletion.");
        }
    }

    @Override
    public List<DriverRequest> findDriverRequestsByUserId(Long userId) {
        return driverRequestRepo.findByUserId(userId);
    }

    @Override
    public List<DriverRequest> findDriverRequestsByDriverId(Long driverId) {
        return driverRequestRepo.findByDriverId(driverId);
    }
}
