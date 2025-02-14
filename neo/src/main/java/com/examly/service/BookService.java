package com.examly.service;

import com.examly.entity.Book;
import java.util.List;

public interface BookService {
    String addBook(Book book);
    String updateBook(Book book);
    String deleteBook(int bookId);
    Book getBookById(int bookId);
    List<Book> getAllBooks();
    List<Book> searchByTitle(String title); // New method for searching by title
    List<Book> sortByAuthorName(); // New method for sorting by author name
}
