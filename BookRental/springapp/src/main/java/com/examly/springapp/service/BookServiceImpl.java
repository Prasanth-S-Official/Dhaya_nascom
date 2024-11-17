package com.examly.springapp.service;

import com.examly.springapp.exceptions.DuplicateBookException;
import com.examly.springapp.exceptions.BookDeletionException;
import com.examly.springapp.model.Book;
import com.examly.springapp.repository.BookRepo;
import com.examly.springapp.repository.BookRentalRequestRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookRepo bookRepo;

    @Autowired
    private BookRentalRequestRepo bookRentalRequestRepo;

    @Override
    public Book addBook(Book book) {
        Optional<Book> existingBook = bookRepo.findByTitle(book.getTitle());
        if (existingBook.isPresent()) {
            throw new DuplicateBookException("Book with the title " + book.getTitle() + " already exists.");
        }
        return bookRepo.save(book);
    }

    @Override
    public Optional<Book> getBookById(Long bookId) {
        return bookRepo.findById(bookId);
    }

    @Override
    public List<Book> getAllBooks() {
        return bookRepo.findAll();
    }

    @Override
    public Book updateBook(Long bookId, Book updatedBook) {
        Optional<Book> optionalBook = bookRepo.findById(bookId);
        if (optionalBook.isPresent()) {
            updatedBook.setBookId(bookId);
            return bookRepo.save(updatedBook);
        } else {
            return null;
        }
    }

    @Override
    public Book deleteBook(Long bookId) {
        Optional<Book> bookOptional = bookRepo.findById(bookId);
        if (bookOptional.isPresent()) {
            Book book = bookOptional.get();

            // Check if the book is referenced in any rental request
            if (bookRentalRequestRepo.existsByBook_BookId(bookId)) {
                throw new BookDeletionException("Book cannot be deleted as it is referenced in a rental request.");
            }

            bookRepo.deleteById(bookId);
            return book;
        } else {
            return null;
        }
    }
}
