package com.examly.service;

import com.examly.entity.Author;
import java.util.List;

public interface AuthorService {
    String addAuthor(Author author);  // Returns success or error message
    Author getAuthorById(int authorId);
    List<Author> getAllAuthors();
}
