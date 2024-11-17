package com.examly.springapp.repository;

import com.examly.springapp.model.BookRentalRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRentalRequestRepo extends JpaRepository<BookRentalRequest, Long> {

    // Fetch rental requests by user ID
    @Query("SELECT b FROM BookRentalRequest b WHERE b.user.userId = :userId")
    List<BookRentalRequest> findBookRentalRequestsByUserId(long userId);

    // Fetch rental requests by book ID
    @Query("SELECT b FROM BookRentalRequest b WHERE b.book.bookId = :bookId")
    List<BookRentalRequest> findBookRentalRequestsByBookId(Long bookId);

    // Find a specific rental request by user ID and book ID
    Optional<BookRentalRequest> findByUser_UserIdAndBook_BookId(long userId, Long bookId);

    // Check if a rental request exists for a specific book
    boolean existsByBook_BookId(Long bookId);
}
