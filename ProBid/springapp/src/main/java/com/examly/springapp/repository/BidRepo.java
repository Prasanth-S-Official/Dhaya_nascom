package com.examly.springapp.repository;

import com.examly.springapp.model.Bid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

@Repository
public interface BidRepo extends JpaRepository<Bid, Long> {

    @Query("SELECT b FROM Bid b WHERE b.project.projectId = :projectId")
    List<Bid> findBidsByProjectId(Long projectId);

    @Query("SELECT b FROM Bid b WHERE b.user.userId = :userId")
    List<Bid> findBidsByUserId(Long userId);

    @Query("SELECT b FROM Bid b WHERE b.status = :status")
    List<Bid> findBidsByStatus(String status);

    Optional<Bid> findByProject_ProjectIdAndUser_UserId(Long projectId, Long userId);
}
