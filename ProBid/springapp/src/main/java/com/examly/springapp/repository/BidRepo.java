package com.examly.springapp.repository;

import com.examly.springapp.model.Bid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BidRepo extends JpaRepository<Bid, Long> {

    @Query("SELECT b FROM Bid b WHERE b.project.projectId = :projectId")
    List<Bid> findBidsByProjectId(Long projectId);

    @Query("SELECT b FROM Bid b WHERE b.user.userId = :userId")
    List<Bid> findBidsByUserId(Long userId);

    Optional<Bid> findByUser_UserIdAndProject_ProjectId(Long userId, Long projectId);
}
