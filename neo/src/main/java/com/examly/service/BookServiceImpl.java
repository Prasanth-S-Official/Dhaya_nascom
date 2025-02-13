package com.examly.service;

import com.examly.entity.Book;
import com.examly.entity.Author;
import com.examly.util.DBConnectionUtil;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class BookServiceImpl implements BookService {

    private Connection connection;
    private AuthorService authorService; // To validate author existence

    public BookServiceImpl() {
        connection = DBConnectionUtil.getConnection();
        authorService = new AuthorServiceImpl();
    }

    @Override
    public String addBook(Book book) {
        // Validate book title
        if (book.getTitle() == null || book.getTitle().isEmpty()) {
            return "Error: Book title cannot be empty.";
        }

        // Validate authorId (check if author exists)
        Author author = authorService.getAuthorById(book.getAuthorId());
        if (author == null) {
            return "Error: Author with ID " + book.getAuthorId() + " does not exist.";
        }

        // Validate published date
        if (book.getPublishedDate() == null || book.getPublishedDate().isEmpty()) {
            return "Error: Published date cannot be empty.";
        }

        // Validate price
        if (book.getPrice() <= 0) {
            return "Error: Price must be greater than zero.";
        }

        // If all validations pass, proceed with inserting the book
        String query = "INSERT INTO books (title, authorId, publishedDate, price) VALUES (?, ?, ?, ?)";
        try (PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setString(1, book.getTitle());
            statement.setInt(2, book.getAuthorId());
            statement.setString(3, book.getPublishedDate());
            statement.setDouble(4, book.getPrice());

            int rowsInserted = statement.executeUpdate();
            return (rowsInserted > 0) ? "Book added successfully!" : "Error: Failed to add book.";
        } catch (SQLException e) {
            return "Database error: " + e.getMessage();
        }
    }

    @Override
    public String updateBook(Book book) {
        // Validate authorId (check if author exists)
        Author author = authorService.getAuthorById(book.getAuthorId());
        if (author == null) {
            return "Error: Author with ID " + book.getAuthorId() + " does not exist.";
        }

        String query = "UPDATE books SET title = ?, authorId = ?, publishedDate = ?, price = ? WHERE bookId = ?";
        try (PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setString(1, book.getTitle());
            statement.setInt(2, book.getAuthorId());
            statement.setString(3, book.getPublishedDate());
            statement.setDouble(4, book.getPrice());
            statement.setInt(5, book.getBookId());

            int rowsUpdated = statement.executeUpdate();
            return (rowsUpdated > 0) ? "Book updated successfully!" : "Error: No book found with ID: " + book.getBookId();
        } catch (SQLException e) {
            return "Database error: " + e.getMessage();
        }
    }

    @Override
    public String deleteBook(int bookId) {
        String query = "DELETE FROM books WHERE bookId = ?";
        try (PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setInt(1, bookId);
            int rowsDeleted = statement.executeUpdate();
            return (rowsDeleted > 0) ? "Book deleted successfully!" : "Error: No book found with ID: " + bookId;
        } catch (SQLException e) {
            return "Database error: " + e.getMessage();
        }
    }

    @Override
    public Book getBookById(int bookId) {
        String query = "SELECT * FROM books WHERE bookId = ?";
        try (PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setInt(1, bookId);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return new Book(
                        resultSet.getInt("bookId"),
                        resultSet.getString("title"),
                        resultSet.getInt("authorId"),
                        resultSet.getDouble("price"),
                        resultSet.getString("publishedDate")
                    );
                } else {
                    System.out.println("No book found with ID: " + bookId);
                }
            }
        } catch (SQLException e) {
            System.err.println("Error retrieving book: " + e.getMessage());
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<Book> getAllBooks() {
        List<Book> books = new ArrayList<>();
        String query = "SELECT * FROM books";
        try (PreparedStatement statement = connection.prepareStatement(query);
             ResultSet resultSet = statement.executeQuery()) {
            while (resultSet.next()) {
                books.add(new Book(
                    resultSet.getInt("bookId"),
                    resultSet.getString("title"),
                    resultSet.getInt("authorId"),
                    resultSet.getDouble("price"),
                    resultSet.getString("publishedDate")
                ));
            }
        } catch (SQLException e) {
            System.err.println("Error retrieving books: " + e.getMessage());
            e.printStackTrace();
        }
        return books;
    }
}
