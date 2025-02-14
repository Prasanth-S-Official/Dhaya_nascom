package com.examly.service;

import com.examly.entity.Department;
import com.examly.util.DBConnectionUtil;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class DepartmentServiceImpl implements DepartmentService {

    private Connection connection;

    public DepartmentServiceImpl() {
        connection = DBConnectionUtil.getConnection();
    }

    @Override
    public String addDepartment(Department department) {
        String query = "INSERT INTO departments (name, description) VALUES (?, ?)";
        try (PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setString(1, department.getName());
            statement.setString(2, department.getDescription());
            int rowsInserted = statement.executeUpdate();
            return (rowsInserted > 0) ? "Department added successfully!" : "Error: Failed to add department.";
        } catch (SQLException e) {
            return "Database error: " + e.getMessage();
        }
    }

    @Override
    public Department getDepartmentById(int departmentId) {
        String query = "SELECT * FROM departments WHERE departmentId = ?";
        try (PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setInt(1, departmentId);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return new Department(
                        resultSet.getInt("departmentId"),
                        resultSet.getString("name"),
                        resultSet.getString("description")
                    );
                } else {
                    System.out.println("No department found with ID: " + departmentId);
                }
            }
        } catch (SQLException e) {
            System.err.println("Error retrieving department: " + e.getMessage());
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<Department> getAllDepartments() {
        List<Department> departments = new ArrayList<>();
        String query = "SELECT * FROM departments";
        try (PreparedStatement statement = connection.prepareStatement(query);
             ResultSet resultSet = statement.executeQuery()) {
            while (resultSet.next()) {
                departments.add(new Department(
                    resultSet.getInt("departmentId"),
                    resultSet.getString("name"),
                    resultSet.getString("description")
                ));
            }
        } catch (SQLException e) {
            System.err.println("Error retrieving departments: " + e.getMessage());
            e.printStackTrace();
        }
        return departments;
    }
}
