package com.examly.springapp.service;

import com.examly.springapp.exceptions.BookException;
import com.examly.springapp.model.BookRentalRequest;
import com.examly.springapp.repository.BookRentalRequestRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookRentalRequestServiceImpl implements BookRentalRequestService {

    @Autowired
    private BookRentalRequestRepo rentalRequestRepo;

    @Override
    public List<BookRentalRequest> getAllBookRentalRequests() {
        return rentalRequestRepo.findAll();
    }

    @Override
    public List<BookRentalRequest> getBookRentalRequestsByUserId(Long userId) {
        return rentalRequestRepo.findBookRentalRequestsByUserId(userId);
    }

    @Override
    public Optional<BookRentalRequest> getBookRentalRequestById(Long requestId) {
        return rentalRequestRepo.findById(requestId);
    }

    @Override
    public BookRentalRequest addBookRentalRequest(BookRentalRequest request) {
        Long userId = Long.valueOf(request.getUser().getUserId());
        Long bookId = request.getBook().getBookId();
        Optional<BookRentalRequest> existingRequest = rentalRequestRepo.findByUser_UserIdAndBook_BookId(userId, bookId);
        if (existingRequest.isPresent()) {
            throw new BookException("User has already requested this book.");
        }
        return rentalRequestRepo.save(request);
    }

    @Override
    public BookRentalRequest updateBookRentalRequest(Long requestId, BookRentalRequest request) {
        Optional<BookRentalRequest> existingRequest = rentalRequestRepo.findById(requestId);
        if (existingRequest.isPresent()) {
            request.setRentalId(requestId);
            return rentalRequestRepo.save(request);
        } else {
            return null;
        }
    }

    @Override
    public boolean deleteBookRentalRequest(Long requestId) {
        Optional<BookRentalRequest> existingRequest = rentalRequestRepo.findById(requestId);
        if (existingRequest.isPresent()) {
            rentalRequestRepo.deleteById(requestId);
            return true;
        } else {
            return false;
        }
    }
}
