package com.examly.springapp.repository;

import com.examly.springapp.model.SupportAgent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

@Repository
public interface SupportAgentRepo extends JpaRepository<SupportAgent, Long> {

    Optional<SupportAgent> findByEmail(String email);

    boolean existsByEmail(String email);

    @Query("SELECT sa FROM SupportAgent sa WHERE sa.status = 'Available'")
    List<SupportAgent> findAvailableAgents();

    @Query("SELECT sa FROM SupportAgent sa WHERE sa.expertise = :expertise")
    List<SupportAgent> findAgentsByExpertise(String expertise);
}
