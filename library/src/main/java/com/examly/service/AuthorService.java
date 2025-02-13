package com.examly.service;

import com.examly.entity.Author;
import java.util.List;

public interface AuthorService {
    void addAuthor(Author author);
    void updateAuthor(Author author);
    void deleteAuthor(int authorId);
    Author getAuthorById(int authorId);
    List<Author> getAllAuthors();
}
