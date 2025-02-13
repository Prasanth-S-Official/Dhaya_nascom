package com.examly.service;

import com.examly.entity.Book;
import java.util.List;

public interface BookService {
    void addBook(Book book);
    void updateBook(Book book);
    void deleteBook(int bookId);
    Book getBookById(int bookId);
    List<Book> getAllBooks();
}
