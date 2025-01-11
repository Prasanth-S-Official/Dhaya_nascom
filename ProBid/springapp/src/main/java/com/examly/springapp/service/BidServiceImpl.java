package com.examly.springapp.service;

import com.examly.springapp.exceptions.BidNotFoundException;
import com.examly.springapp.exceptions.DuplicateBidException;
import com.examly.springapp.model.Bid;
import com.examly.springapp.model.Project;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.BidRepo;
import com.examly.springapp.repository.ProjectRepo;
import com.examly.springapp.repository.UserRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class BidServiceImpl implements BidService {

    @Autowired
    private BidRepo bidRepo;

    @Autowired
    private ProjectRepo projectRepo;

    @Autowired
    private UserRepo userRepo;

    @Override
    public Bid addBid(Bid bid) {
        Long userId = bid.getUser().getUserId();
        Long projectId = bid.getProject().getProjectId();

        Optional<Bid> existingBid = bidRepo.findByUser_UserIdAndProject_ProjectId(userId, projectId);
        if (existingBid.isPresent()) {
            throw new DuplicateBidException("User has already placed a bid on this project.");
        }

        return bidRepo.save(bid);
    }

    @Override
    public Optional<Bid> getBidById(Long bidId) {
        return bidRepo.findById(bidId);
    }

    @Override
    public List<Bid> getAllBids() {
        return bidRepo.findAll();
    }

    @Override
    public List<Bid> getBidsByProjectId(Long projectId) {
        return bidRepo.findBidsByProjectId(projectId);
    }

    @Override
    public List<Bid> getBidsByUserId(Long userId) {
        return bidRepo.findBidsByUserId(userId);
    }

    @Override
    public Bid updateBid(Long bidId, Bid bid) {
        Optional<Bid> existingBid = bidRepo.findById(bidId);
        if (existingBid.isPresent()) {
            bid.setBidId(bidId);
            return bidRepo.save(bid);
        } else {
            throw new BidNotFoundException("Bid not found for updating.");
        }
    }

    @Override
    public boolean deleteBid(Long bidId) {
        Optional<Bid> existingBid = bidRepo.findById(bidId);
        if (existingBid.isPresent()) {
            bidRepo.deleteById(bidId);
            return true;
        } else {
            throw new BidNotFoundException("Bid not found for deletion.");
        }
    }
}
