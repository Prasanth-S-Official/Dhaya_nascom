package com.examly.springapp.repository;

import com.examly.springapp.model.Turf;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface TurfRepo extends JpaRepository<Turf, Long> {

    // Find Turf by Name
    Optional<Turf> findByTurfName(String turfName);

    // Find Turf by Location
    List<Turf> findByLocation(String location);

    // Check if a Turf exists by Name
    boolean existsByTurfName(String turfName);

    // Find Turfs by Availability Status
    List<Turf> findByAvailabilityStatus(String availabilityStatus);
}
