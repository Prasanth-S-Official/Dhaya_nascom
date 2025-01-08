package com.examly.springapp.service;

import com.examly.springapp.model.Bid;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface BidService {
    Bid addBid(Bid bid);

    Optional<Bid> getBidById(Long bidId);

    List<Bid> getAllBids();

    List<Bid> getBidsByProjectId(Long projectId);

    List<Bid> getBidsByUserId(Long userId);

    Bid updateBid(Long bidId, Bid bid);

    boolean deleteBid(Long bidId);

    List<Map<String, Object>> getAllBidInsights();
}
