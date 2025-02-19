package com.examly.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnectionUtil {

    private static final String URL = "jdbc:mysql://localhost:3306/appdb";
    private static final String USER = "root";
    private static final String PASSWORD = "examly";
    
    private static Connection connection;

    public static Connection getConnection() {
        if (connection == null) {
            try {
                // Load MySQL JDBC Driver explicitly
                Class.forName("com.mysql.cj.jdbc.Driver");

                // Establish the connection
                connection = DriverManager.getConnection(URL, USER, PASSWORD);
                System.out.println("Database connected successfully!");

            } catch (ClassNotFoundException e) {
                System.err.println("Error: MySQL JDBC Driver not found. Ensure it's in the classpath.");
                e.printStackTrace();
            } catch (SQLException e) {
                System.err.println("Error connecting to the database. Check MySQL status and credentials.");
                e.printStackTrace();
            }
        }
        return connection;
    }

    public static void closeConnection() {
        if (connection != null) {
            try {
                connection.close();
                System.out.println("Database connection closed.");
            } catch (SQLException e) {
                System.err.println("Error closing database connection.");
                e.printStackTrace();
            }
        }
    }
}

