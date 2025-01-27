package com.examly.springapp.repository;

import com.examly.springapp.model.TurfBookingRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TurfBookingRequestRepo extends JpaRepository<TurfBookingRequest, Long> {

    // Find TurfBookingRequest by Status
    List<TurfBookingRequest> findByStatus(String status);

    // Find TurfBookingRequest by User ID
    @Query("SELECT tbr FROM TurfBookingRequest tbr WHERE tbr.user.userId = :userId")
    List<TurfBookingRequest> findByUserId(Long userId);

    // Find TurfBookingRequest by Turf ID
    @Query("SELECT tbr FROM TurfBookingRequest tbr WHERE tbr.turf.turfId = :turfId")
    List<TurfBookingRequest> findByTurfId(Long turfId);

    // Find TurfBookingRequest by Booking Date
    List<TurfBookingRequest> findByBookingDate(LocalDate bookingDate);

    // Find TurfBookingRequests for a specific event date
    @Query("SELECT tbr FROM TurfBookingRequest tbr WHERE tbr.eventDate = :eventDate")
    List<TurfBookingRequest> findByEventDate(LocalDate eventDate);
}
