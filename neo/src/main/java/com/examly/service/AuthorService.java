package com.examly.service;

import com.examly.entity.Author;
import java.util.List;

public interface AuthorService {
    String addAuthor(Author author);  // Returns success or error message
    String updateAuthor(Author author);
    String deleteAuthor(int authorId);
    Author getAuthorById(int authorId);
    List<Author> getAllAuthors();
}
