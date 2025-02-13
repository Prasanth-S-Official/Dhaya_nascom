package com.examly.service;

import com.examly.entity.Book;
import com.examly.service.BookService;
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
    public void addBook(Book book) {
        // Check if the book title is valid
        if (book.getTitle() == null || book.getTitle().isEmpty()) {
            System.out.println("Book title cannot be empty.");
            return;
        }
    
        // Check if the author name is valid
        if (book.getAuthor() == null || book.getAuthor().isEmpty()) {
            System.out.println("Author name cannot be empty.");
            return;
        }
    
        // Check if the published date is valid (Ensure the format is correct)
        if (book.getPublishedDate() == null || book.getPublishedDate().isEmpty()) {
            System.out.println("Published date cannot be empty.");
            return;
        }
        
        // Ensure price is valid
        if (book.getPrice() <= 0) {
            System.out.println("Price must be greater than zero.");
            return;
        }
    
        try {
            String query = "INSERT INTO books (title, author, publishedDate, price) VALUES (?, ?, ?, ?)";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, book.getTitle());
            statement.setString(2, book.getAuthor());
    
            // Make sure the date is correctly formatted, you can convert it if necessary
            // Assuming the date format is correct (YYYY-MM-DD) - if not, parse it
            statement.setString(3, book.getPublishedDate());  // If it's a String in the correct format, no need for Date.valueOf
    
            statement.setDouble(4, book.getPrice());
            int rowsInserted = statement.executeUpdate();

            
            
            // Check if the insertion was successful
            if (rowsInserted > 0) {
                System.out.println("Book added successfully!");
            } else {
                System.out.println("Failed to add book.");
            }
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("Error occurred while adding the book.");
        }
    }
    

    @Override
    public void updateBook(Book book) {
        try {
            String query = "UPDATE books SET title = ?, author = ?, publishedDate = ?, price = ? WHERE bookId = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, book.getTitle());
            statement.setString(2, book.getAuthor());
            statement.setString(3, book.getPublishedDate()); // Handle publishedDate as String
            statement.setDouble(4, book.getPrice());
            statement.setInt(5, book.getBookId());
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void deleteBook(int bookId) {
        try {
            String query = "DELETE FROM books WHERE bookId = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, bookId);
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public Book getBookById(int bookId) {
        try {
            String query = "SELECT * FROM books WHERE bookId = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, bookId);
            ResultSet resultSet = statement.executeQuery();
            if (resultSet.next()) {
                Book book = new Book();
                book.setBookId(resultSet.getInt("bookId"));
                book.setTitle(resultSet.getString("title"));
                book.setAuthor(resultSet.getString("author"));
                book.setPublishedDate(resultSet.getString("publishedDate")); // Get as String
                book.setPrice(resultSet.getDouble("price"));
                return book;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<Book> getAllBooks() {
        List<Book> books = new ArrayList<>();
        try {
            String query = "SELECT * FROM books";
            PreparedStatement statement = connection.prepareStatement(query);
            ResultSet resultSet = statement.executeQuery();
            while (resultSet.next()) {
                Book book = new Book();
                book.setBookId(resultSet.getInt("bookId"));
                book.setTitle(resultSet.getString("title"));
                book.setAuthor(resultSet.getString("author"));
                book.setPublishedDate(resultSet.getString("publishedDate")); // Get as String
                book.setPrice(resultSet.getDouble("price"));
                books.add(book);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return books;
    }
}


