package com.examly.springapp.controller;

import com.examly.springapp.exceptions.DuplicateDriverException;
import com.examly.springapp.model.Driver;
import com.examly.springapp.service.DriverService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/driver")
public class DriverController {

    @Autowired
    private DriverService driverService;

    @PostMapping
    public ResponseEntity<?> addDriver(@RequestBody Driver driver) {
        try {
            Driver newDriver = driverService.addDriver(driver);
            return new ResponseEntity<>(newDriver, HttpStatus.CREATED);
        } catch (DuplicateDriverException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{driverId}")
    public ResponseEntity<Driver> getDriverById(@PathVariable Long driverId) {
        Optional<Driver> driver = driverService.getDriverById(driverId);
        return driver.map(value -> ResponseEntity.status(HttpStatus.OK).body(value))
                     .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping
    public ResponseEntity<List<Driver>> getAllDrivers() {
        List<Driver> allDrivers = driverService.getAllDrivers();
        return ResponseEntity.status(HttpStatus.OK).body(allDrivers);
    }

    @PutMapping("/{driverId}")
    public ResponseEntity<Driver> updateDriver(@PathVariable Long driverId, @RequestBody Driver driver) {
        Driver updatedDriver = driverService.updateDriver(driverId, driver);
        if (updatedDriver != null) {
            return ResponseEntity.status(HttpStatus.OK).body(updatedDriver);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{driverId}")
    public ResponseEntity<Driver> deleteDriver(@PathVariable Long driverId) {
        Driver deletedDriver = driverService.deleteDriver(driverId);
        if (deletedDriver != null) {
            return ResponseEntity.status(HttpStatus.OK).body(deletedDriver);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
