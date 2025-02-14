package com.examly.service;

import com.examly.entity.Book;
import java.util.List;

public interface BookService {
    String addBook(Book book);  // Returns success or error message
    String updateBook(Book book);
    String deleteBook(int bookId);
    Book getBookById(int bookId);
    List<Book> getAllBooks();
}
