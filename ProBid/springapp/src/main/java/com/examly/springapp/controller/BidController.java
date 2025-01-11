package com.examly.springapp.controller;

import com.examly.springapp.model.Bid;
import com.examly.springapp.service.BidService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/bid")
public class BidController {

    @Autowired
    private BidService bidService;

    @PostMapping
    public ResponseEntity<?> addBid(@RequestBody Bid bid) {
        try {
            Bid newBid = bidService.addBid(bid);
            return new ResponseEntity<>(newBid, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/{bidId}")
    public ResponseEntity<Bid> getBidById(@PathVariable Long bidId) {
        Optional<Bid> bid = bidService.getBidById(bidId);
        return bid.map(value -> ResponseEntity.status(HttpStatus.OK).body(value))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping
    public ResponseEntity<List<Bid>> getAllBids() {
        List<Bid> allBids = bidService.getAllBids();
        return ResponseEntity.status(HttpStatus.OK).body(allBids);
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<Bid>> getBidsByProjectId(@PathVariable Long projectId) {
        List<Bid> projectBids = bidService.getBidsByProjectId(projectId);
        return ResponseEntity.status(HttpStatus.OK).body(projectBids);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Bid>> getBidsByUserId(@PathVariable Long userId) {
        List<Bid> userBids = bidService.getBidsByUserId(userId);
        return ResponseEntity.status(HttpStatus.OK).body(userBids);
    }

    @PutMapping("/{bidId}")
    public ResponseEntity<Bid> updateBid(@PathVariable Long bidId, @RequestBody Bid bid) {
        try {
            Bid updatedBid = bidService.updateBid(bidId, bid);
            return ResponseEntity.status(HttpStatus.OK).body(updatedBid);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @DeleteMapping("/{bidId}")
    public ResponseEntity<?> deleteBid(@PathVariable Long bidId) {
        try {
            boolean isDeleted = bidService.deleteBid(bidId);
            if (isDeleted) {
                return ResponseEntity.status(HttpStatus.OK).build();
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

}
