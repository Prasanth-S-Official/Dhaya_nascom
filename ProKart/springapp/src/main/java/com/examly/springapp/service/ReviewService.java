package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;
import com.examly.springapp.model.Review;

public interface ReviewService {

    Review addReview(Review review);

    Optional<Review> getReviewById(Long reviewId);

    List<Review> getAllReviews();

    List<Review> getReviewsByUserId(Long userId);

    List<Review> getReviewsByProductId(Long productId);

    Review updateReview(Long reviewId, Review review);

    boolean deleteReview(Long reviewId);
}
