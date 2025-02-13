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
    public void addBook(Book book) {
        // Validate book title
        if (book.getTitle() == null || book.getTitle().isEmpty()) {
            System.out.println("Error: Book title cannot be empty.");
            return;
        }

        // Validate authorId (check if author exists)
        Author author = authorService.getAuthorById(book.getAuthorId());
        if (author == null) {
            System.out.println("Error: Author with ID " + book.getAuthorId() + " does not exist.");
            return;
        }

        // Validate published date
        if (book.getPublishedDate() == null || book.getPublishedDate().isEmpty()) {
            System.out.println("Error: Published date cannot be empty.");
            return;
        }

        // Validate price
        if (book.getPrice() <= 0) {
            System.out.println("Error: Price must be greater than zero.");
            return;
        }

        String query = "INSERT INTO books (title, authorId, publishedDate, price) VALUES (?, ?, ?, ?)";
        try (PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setString(1, book.getTitle());
            statement.setInt(2, book.getAuthorId());
            statement.setString(3, book.getPublishedDate());
            statement.setDouble(4, book.getPrice());

            int rowsInserted = statement.executeUpdate();
            if (rowsInserted > 0) {
                System.out.println("Book added successfully!");
            } else {
                System.out.println("Error: Failed to add book.");
            }
        } catch (SQLException e) {
            System.err.println("Error adding book: " + e.getMessage());
            e.printStackTrace();
        }
    }

    @Override
    public void updateBook(Book book) {
        // Validate authorId (check if author exists)
        Author author = authorService.getAuthorById(book.getAuthorId());
        if (author == null) {
            System.out.println("Error: Author with ID " + book.getAuthorId() + " does not exist.");
            return;
        }

        String query = "UPDATE books SET title = ?, authorId = ?, publishedDate = ?, price = ? WHERE bookId = ?";
        try (PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setString(1, book.getTitle());
            statement.setInt(2, book.getAuthorId());
            statement.setString(3, book.getPublishedDate());
            statement.setDouble(4, book.getPrice());
            statement.setInt(5, book.getBookId());

            int rowsUpdated = statement.executeUpdate();
            if (rowsUpdated > 0) {
                System.out.println("Book updated successfully!");
            } else {
                System.out.println("Error: No book found with ID: " + book.getBookId());
            }
        } catch (SQLException e) {
            System.err.println("Error updating book: " + e.getMessage());
            e.printStackTrace();
        }
    }

    @Override
    public void deleteBook(int bookId) {
        String query = "DELETE FROM books WHERE bookId = ?";
        try (PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setInt(1, bookId);
            int rowsDeleted = statement.executeUpdate();
            if (rowsDeleted > 0) {
                System.out.println("Book deleted successfully!");
            } else {
                System.out.println("Error: No book found with ID: " + bookId);
            }
        } catch (SQLException e) {
            System.err.println("Error deleting book: " + e.getMessage());
            e.printStackTrace();
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
