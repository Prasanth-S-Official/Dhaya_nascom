package com.examly.springapp.repository;

import com.examly.springapp.model.DriverRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface DriverRequestRepo extends JpaRepository<DriverRequest, Long> {

    // Find DriverRequest by Status
    List<DriverRequest> findByStatus(String status);

    // Find DriverRequest by User ID
    @Query("SELECT dr FROM DriverRequest dr WHERE dr.user.userId = :userId")
    List<DriverRequest> findByUserId(Long userId);

    // Find DriverRequest by Driver ID
    @Query("SELECT dr FROM DriverRequest dr WHERE dr.driver.driverId = :driverId")
    List<DriverRequest> findByDriverId(Long driverId);

    // Custom Query: Find DriverRequests by Trip Date
    @Query("SELECT dr FROM DriverRequest dr WHERE dr.tripDate = :tripDate")
    List<DriverRequest> findRequestsByTripDate(LocalDate tripDate);

    // Custom Query: Find Pending DriverRequests
    @Query("SELECT dr FROM DriverRequest dr WHERE dr.status = 'Pending'")
    List<DriverRequest> findPendingRequests();

    // Custom Query: Find Completed DriverRequests within Date Range
    @Query("SELECT dr FROM DriverRequest dr WHERE dr.status = 'Completed' AND dr.tripDate BETWEEN :startDate AND :endDate")
    List<DriverRequest> findCompletedRequestsWithinDateRange(LocalDate startDate, LocalDate endDate);
}
