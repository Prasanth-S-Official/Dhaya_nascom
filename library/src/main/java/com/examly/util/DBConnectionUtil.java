package com.examly.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnectionUtil {

    private static final String URL = "jdbc:mysql://localhost:3306/appdb";  // Database URL
    private static final String USER = "root";  // Database username
    private static final String PASSWORD = "examly";  // Database password
    private static Connection connection;

    public static Connection getConnection() {
        if (connection == null) {
            try {
                // Establish a connection to the database
                connection = DriverManager.getConnection(URL, USER, PASSWORD);
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return connection;
    }

    public static void closeConnection() {
        if (connection != null) {
            try {
                connection.close();  // Close the connection
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
