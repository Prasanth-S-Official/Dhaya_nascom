package com.examly.service;

import com.examly.entity.Author;
import com.examly.service.AuthorService;
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
        try {
            String query = "INSERT INTO authors (name, biography) VALUES (?, ?)";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, author.getName());
            statement.setString(2, author.getBiography());
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void updateAuthor(Author author) {
        try {
            String query = "UPDATE authors SET name = ?, biography = ? WHERE authorId = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, author.getName());
            statement.setString(2, author.getBiography());
            statement.setInt(3, author.getAuthorId());
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void deleteAuthor(int authorId) {
        try {
            String query = "DELETE FROM authors WHERE authorId = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, authorId);
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public Author getAuthorById(int authorId) {
        try {
            String query = "SELECT * FROM authors WHERE authorId = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, authorId);
            ResultSet resultSet = statement.executeQuery();
            if (resultSet.next()) {
                Author author = new Author();
                author.setAuthorId(resultSet.getInt("authorId"));
                author.setName(resultSet.getString("name"));
                author.setBiography(resultSet.getString("biography"));
                return author;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<Author> getAllAuthors() {
        List<Author> authors = new ArrayList<>();
        try {
            String query = "SELECT * FROM authors";
            PreparedStatement statement = connection.prepareStatement(query);
            ResultSet resultSet = statement.executeQuery();
            while (resultSet.next()) {
                Author author = new Author(0, query, query);
                author.setAuthorId(resultSet.getInt("authorId"));
                author.setName(resultSet.getString("name"));
                author.setBiography(resultSet.getString("biography"));
                authors.add(author);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return authors;
    }
}
