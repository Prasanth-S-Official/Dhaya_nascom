package com.examly.service;

import com.examly.entity.Author;
import com.examly.util.DBConnectionUtil;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class AuthorServiceImpl implements AuthorService {

    private Connection connection;

    public AuthorServiceImpl() {
        connection = DBConnectionUtil.getConnection();
    }

    @Override
    public void addAuthor(Author author) {
        String query = "INSERT INTO authors (name, biography) VALUES (?, ?)";
        try (PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setString(1, author.getName());
            statement.setString(2, author.getBiography());
            statement.executeUpdate();
            System.out.println("Author added successfully!");
        } catch (SQLException e) {
            System.err.println("Error adding author: " + e.getMessage());
            e.printStackTrace();
        }
    }

    @Override
    public void updateAuthor(Author author) {
        String query = "UPDATE authors SET name = ?, biography = ? WHERE authorId = ?";
        try (PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setString(1, author.getName());
            statement.setString(2, author.getBiography());
            statement.setInt(3, author.getAuthorId());
            int rowsUpdated = statement.executeUpdate();
            if (rowsUpdated > 0) {
                System.out.println("Author updated successfully!");
            } else {
                System.out.println("No author found with ID: " + author.getAuthorId());
            }
        } catch (SQLException e) {
            System.err.println("Error updating author: " + e.getMessage());
            e.printStackTrace();
        }
    }

    @Override
    public void deleteAuthor(int authorId) {
        String query = "DELETE FROM authors WHERE authorId = ?";
        try (PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setInt(1, authorId);
            int rowsDeleted = statement.executeUpdate();
            if (rowsDeleted > 0) {
                System.out.println("Author deleted successfully!");
            } else {
                System.out.println("No author found with ID: " + authorId);
            }
        } catch (SQLException e) {
            System.err.println("Error deleting author: " + e.getMessage());
            e.printStackTrace();
        }
    }

    @Override
    public Author getAuthorById(int authorId) {
        String query = "SELECT * FROM authors WHERE authorId = ?";
        try (PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setInt(1, authorId);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return new Author(
                        resultSet.getInt("authorId"),
                        resultSet.getString("name"),
                        resultSet.getString("biography")
                    );
                } else {
                    System.out.println("No author found with ID: " + authorId);
                }
            }
        } catch (SQLException e) {
            System.err.println("Error retrieving author: " + e.getMessage());
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<Author> getAllAuthors() {
        List<Author> authors = new ArrayList<>();
        String query = "SELECT * FROM authors";
        try (PreparedStatement statement = connection.prepareStatement(query);
             ResultSet resultSet = statement.executeQuery()) {
            while (resultSet.next()) {
                authors.add(new Author(
                    resultSet.getInt("authorId"),
                    resultSet.getString("name"),
                    resultSet.getString("biography")
                ));
            }
        } catch (SQLException e) {
            System.err.println("Error retrieving authors: " + e.getMessage());
            e.printStackTrace();
        }
        return authors;
    }
}
