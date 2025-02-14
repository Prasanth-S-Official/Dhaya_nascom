package com.examly.service;

import com.examly.entity.Book;
import com.examly.util.DBConnectionUtil;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class BookServiceImpl implements BookService {

    private Connection connection;

    public BookServiceImpl() {
        connection = DBConnectionUtil.getConnection();
    }

    @Override
    public String addBook(Book book) {
        if (book.getTitle() == null || book.getTitle().isEmpty()) {
            return "Error: Book title cannot be empty.";
        }
        if (book.getAuthorName() == null || book.getAuthorName().isEmpty()) {
            return "Error: Author name cannot be empty.";
        }
        if (book.getPublishedDate() == null || book.getPublishedDate().isEmpty()) {
            return "Error: Published date cannot be empty.";
        }
        if (book.getPrice() <= 0) {
            return "Error: Price must be greater than zero.";
        }
        
        String query = "INSERT INTO books (title, authorName, publishedDate, price) VALUES (?, ?, ?, ?)";
        try (PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setString(1, book.getTitle());
            statement.setString(2, book.getAuthorName());
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
        String query = "UPDATE books SET title = ?, authorName = ?, publishedDate = ?, price = ? WHERE bookId = ?";
        try (PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setString(1, book.getTitle());
            statement.setString(2, book.getAuthorName());
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
                        resultSet.getString("authorName"),
                        resultSet.getDouble("price"),
                        resultSet.getString("publishedDate")
                    );
                }
            }
        } catch (SQLException e) {
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
                    resultSet.getString("authorName"),
                    resultSet.getDouble("price"),
                    resultSet.getString("publishedDate")
                ));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return books;
    }

    @Override
    public List<Book> searchByTitle(String title) {
        List<Book> books = new ArrayList<>();
        String query = "SELECT * FROM books WHERE title LIKE ?";
        try (PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setString(1, "%" + title + "%");
            try (ResultSet resultSet = statement.executeQuery()) {
                while (resultSet.next()) {
                    books.add(new Book(
                        resultSet.getInt("bookId"),
                        resultSet.getString("title"),
                        resultSet.getString("authorName"),
                        resultSet.getDouble("price"),
                        resultSet.getString("publishedDate")
                    ));
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return books;
    }

    @Override
    public List<Book> filterByAuthorName(String authorName) {  // Ensure this is properly overridden
        List<Book> books = new ArrayList<>();
        String query = "SELECT * FROM books WHERE authorName = ?";
        try (PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setString(1, authorName);
            try (ResultSet resultSet = statement.executeQuery()) {
                while (resultSet.next()) {
                    books.add(new Book(
                        resultSet.getInt("bookId"),
                        resultSet.getString("title"),
                        resultSet.getString("authorName"),
                        resultSet.getDouble("price"),
                        resultSet.getString("publishedDate")
                    ));
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return books;
    }
}
