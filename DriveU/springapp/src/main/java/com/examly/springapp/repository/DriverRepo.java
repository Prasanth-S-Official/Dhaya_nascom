package com.examly.springapp.repository;

import com.examly.springapp.model.Driver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

@Repository
public interface DriverRepo extends JpaRepository<Driver, Long> {

    // Find Driver by Name
    Optional<Driver> findByDriverName(String driverName);

    // Find Driver by License Number
    Optional<Driver> findByLicenseNumber(String licenseNumber);

    // Check if a Driver exists by License Number
    boolean existsByLicenseNumber(String licenseNumber);

    // Custom Query: Find Drivers by Vehicle Type
    @Query("SELECT d FROM Driver d WHERE d.vehicleType = :vehicleType")
    List<Driver> findDriversByVehicleType(String vehicleType);

    // Custom Query: Find Available Drivers
    @Query("SELECT d FROM Driver d WHERE d.availabilityStatus = 'Available'")
    List<Driver> findAvailableDrivers();

    // Custom Query: Find Drivers with Rating Above Threshold
    @Query("SELECT d FROM Driver d WHERE d.rating >= :ratingThreshold")
    List<Driver> findDriversByRatingThreshold(Double ratingThreshold);
}
