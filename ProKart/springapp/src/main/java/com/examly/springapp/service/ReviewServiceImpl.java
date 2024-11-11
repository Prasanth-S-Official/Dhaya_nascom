package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.examly.springapp.model.Review;
import com.examly.springapp.repository.ReviewRepo;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewRepo reviewRepo;

    @Override
    public Review addReview(Review review) {
        review.setDate(java.time.LocalDate.now());  // Set the current date
        return reviewRepo.save(review);
    }

    @Override
    public Optional<Review> getReviewById(Long reviewId) {
        return reviewRepo.findById(reviewId);
    }

    @Override
    public List<Review> getAllReviews() {
        return reviewRepo.findAll();
    }

    @Override
    public List<Review> getReviewsByUserId(Long userId) {
        return reviewRepo.findByUserUserId(userId);
    }

    @Override
    public List<Review> getReviewsByProductId(Long productId) {
        return reviewRepo.findByProductProductId(productId);
    }

    @Override
    public Review updateReview(Long reviewId, Review updatedReview) {
        if (reviewRepo.existsById(reviewId)) {
            updatedReview.setReviewId(reviewId);
            updatedReview.setDate(java.time.LocalDate.now());  // Update date to current date
            return reviewRepo.save(updatedReview);
        }
        return null;
    }

    @Override
    public boolean deleteReview(Long reviewId) {
        if (reviewRepo.existsById(reviewId)) {
            reviewRepo.deleteById(reviewId);
            return true;
        }
        return false;
    }
}
