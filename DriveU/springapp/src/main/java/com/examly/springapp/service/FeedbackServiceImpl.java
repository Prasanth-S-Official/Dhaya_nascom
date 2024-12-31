package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Feedback;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.FeedbackRepo;
import com.examly.springapp.repository.UserRepo;

@Service
public class FeedbackServiceImpl  {

    @Autowired
    FeedbackRepo feedbackRepo;

    @Autowired
    UserRepo userRepo;

    public Feedback createFeedback(Feedback feedback) {
        User user= userRepo.findById(feedback.getUser().getUserId()).orElse(null);
        feedback.setUser(user);
        return feedbackRepo.save(feedback);
    }

    public Feedback getFeedbackById(Long feedbackId) {
        Optional<Feedback> optionalFeedback = feedbackRepo.findById(feedbackId);
        return optionalFeedback.orElse(null);
    }

    public List<Feedback> getAllFeedbacks() {
        return feedbackRepo.findAll();
    }

  
    
    public Feedback deleteFeedback(Long feedbackId) {
        Feedback feedback = feedbackRepo.findById(feedbackId).orElse(null);
        feedbackRepo.deleteById(feedbackId);
        return feedback;
           
    }

    public List<Feedback> getFeedbacksByUserId(Long userId) {
        return feedbackRepo.findFeedbackByUserId(userId);
    }
    
}
