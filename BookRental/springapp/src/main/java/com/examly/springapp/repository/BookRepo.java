package com.examly.springapp.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.examly.springapp.model.Book;

@Repository
public interface BookRepo extends JpaRepository<Book, Long> {

    // Find book by title
    Optional<Book> findByTitle(String title);

    // Check if a book with a specific title exists
    boolean existsByTitle(String title);
}
