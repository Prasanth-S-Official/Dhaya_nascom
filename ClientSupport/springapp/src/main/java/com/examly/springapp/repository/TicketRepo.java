package com.examly.springapp.repository;

import com.examly.springapp.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

@Repository
public interface TicketRepo extends JpaRepository<Ticket, Long> {

    // Find Ticket by Title
    Optional<Ticket> findByTitle(String title);

    // Check if a Ticket exists by Title
    boolean existsByTitle(String title);

    // Custom Query: Find Open Tickets
    @Query("SELECT t FROM Ticket t WHERE t.status = 'Open'")
    List<Ticket> findOpenTickets();

    // Custom Query: Find High-Priority Tickets
    @Query("SELECT t FROM Ticket t WHERE t.priority = 'High'")
    List<Ticket> findHighPriorityTickets();

    // Custom Query: Find Tickets by Agent ID
    List<Ticket> findBySupportAgent_AgentId(Long agentId);
    // Custom Query: Find Tickets by User ID
        List<Ticket> findByUser_UserId(Long userId);

}
