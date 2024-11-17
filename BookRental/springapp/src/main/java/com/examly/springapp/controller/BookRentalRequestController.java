package com.examly.springapp.controller;

import com.examly.springapp.exceptions.BookException;
import com.examly.springapp.model.BookRentalRequest;
import com.examly.springapp.service.BookRentalRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookrentalrequest")
public class BookRentalRequestController {

    @Autowired
    private BookRentalRequestService rentalRequestService;

    @GetMapping
    public ResponseEntity<List<BookRentalRequest>> getAllRequests() {
        List<BookRentalRequest> requests = rentalRequestService.getAllBookRentalRequests();
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BookRentalRequest>> getRequestsByUserId(@PathVariable Long userId) {
        List<BookRentalRequest> requests = rentalRequestService.getBookRentalRequestsByUserId(userId);
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookRentalRequest> getRequestById(@PathVariable Long id) {
        Optional<BookRentalRequest> request = rentalRequestService.getBookRentalRequestById(id);
        if (request.isPresent()) {
            return ResponseEntity.ok(request.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<BookRentalRequest> addRequest(@RequestBody BookRentalRequest request) {
        try {
            BookRentalRequest addedRequest = rentalRequestService.addBookRentalRequest(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(addedRequest);
        } catch (BookException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookRentalRequest> updateRequest(@PathVariable Long id, @RequestBody BookRentalRequest request) {
        BookRentalRequest updatedRequest = rentalRequestService.updateBookRentalRequest(id, request);
        if (updatedRequest != null) {
            return ResponseEntity.ok(updatedRequest);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRequest(@PathVariable Long id) {
        boolean deleted = rentalRequestService.deleteBookRentalRequest(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
