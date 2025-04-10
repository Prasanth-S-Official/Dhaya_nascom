package com.examly.springapp.service;

import com.examly.springapp.exceptions.DuplicateDriverException;
import com.examly.springapp.exceptions.DriverDeletionException;
import com.examly.springapp.model.Driver;
import com.examly.springapp.repository.DriverRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DriverServiceImpl implements DriverService {

    @Autowired
    private DriverRepo driverRepo;

    @Override
    public Driver addDriver(Driver driver) {
        // Check for duplicate driver by license number
        Optional<Driver> existingDriver = driverRepo.findByLicenseNumber(driver.getLicenseNumber());
        if (existingDriver.isPresent()) {
            throw new DuplicateDriverException("Driver with license number " + driver.getLicenseNumber() + " already exists.");
        }
        return driverRepo.save(driver);
    }

    @Override
    public Optional<Driver> getDriverById(Long driverId) {
        return driverRepo.findById(driverId);
    }

    @Override
    public List<Driver> getAllDrivers() {
        return driverRepo.findAll();
    }

    @Override
    public Driver updateDriver(Long driverId, Driver driver) {
        if (driverRepo.existsById(driverId)) {
            driver.setDriverId(driverId);
            return driverRepo.save(driver);
        }
        return null;
    }

    @Override
    public Driver deleteDriver(Long driverId) {
        Optional<Driver> existingDriver = driverRepo.findById(driverId);
        if (existingDriver.isPresent()) {
            driverRepo.deleteById(driverId);
            return existingDriver.get();
        } else {
            throw new DriverDeletionException("Driver not found for deletion.");
        }
    }

}
