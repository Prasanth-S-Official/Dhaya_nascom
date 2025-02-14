package com.examly.service;

import com.examly.entity.Employee;
import com.examly.util.DBConnectionUtil;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class EmployeeServiceImpl implements EmployeeService {

    private Connection connection;

    public EmployeeServiceImpl() {
        connection = DBConnectionUtil.getConnection();
    }

    @Override
    public String addEmployee(Employee employee) {
        // Validate employee name
        if (employee.getName() == null || employee.getName().isEmpty()) {
            return "Error: Employee name cannot be empty.";
        }

        // Validate department
        if (employee.getDepartment() == null || employee.getDepartment().isEmpty()) {
            return "Error: Department cannot be empty.";
        }

        // Validate salary
        if (employee.getSalary() <= 0) {
            return "Error: Salary must be greater than zero.";
        }

        // Insert into database
        String query = "INSERT INTO employees (name, department, salary, joiningDate) VALUES (?, ?, ?, ?)";
        try (PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setString(1, employee.getName());
            statement.setString(2, employee.getDepartment());
            statement.setDouble(3, employee.getSalary());
            statement.setString(4, employee.getJoiningDate());

            int rowsInserted = statement.executeUpdate();
            return (rowsInserted > 0) ? "Employee added successfully!" : "Error: Failed to add employee.";
        } catch (SQLException e) {
            return "Database error: " + e.getMessage();
        }
    }

    @Override
    public String updateEmployee(Employee employee) {
        String query = "UPDATE employees SET name = ?, department = ?, salary = ?, joiningDate = ? WHERE employeeId = ?";
        try (PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setString(1, employee.getName());
            statement.setString(2, employee.getDepartment());
            statement.setDouble(3, employee.getSalary());
            statement.setString(4, employee.getJoiningDate());
            statement.setInt(5, employee.getEmployeeId());

            int rowsUpdated = statement.executeUpdate();
            return (rowsUpdated > 0) ? "Employee updated successfully!" : "Error: No employee found with ID: " + employee.getEmployeeId();
        } catch (SQLException e) {
            return "Database error: " + e.getMessage();
        }
    }

    @Override
    public String deleteEmployee(int employeeId) {
        String query = "DELETE FROM employees WHERE employeeId = ?";
        try (PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setInt(1, employeeId);
            int rowsDeleted = statement.executeUpdate();
            return (rowsDeleted > 0) ? "Employee deleted successfully!" : "Error: No employee found with ID: " + employeeId;
        } catch (SQLException e) {
            return "Database error: " + e.getMessage();
        }
    }

    @Override
    public Employee getEmployeeById(int employeeId) {
        String query = "SELECT * FROM employees WHERE employeeId = ?";
        try (PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setInt(1, employeeId);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return new Employee(
                        resultSet.getInt("employeeId"),
                        resultSet.getString("name"),
                        resultSet.getString("department"),
                        resultSet.getDouble("salary"),
                        resultSet.getString("joiningDate")
                    );
                } else {
                    System.out.println("No employee found with ID: " + employeeId);
                }
            }
        } catch (SQLException e) {
            System.err.println("Error retrieving employee: " + e.getMessage());
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<Employee> getAllEmployees() {
        List<Employee> employees = new ArrayList<>();
        String query = "SELECT * FROM employees";
        try (PreparedStatement statement = connection.prepareStatement(query);
             ResultSet resultSet = statement.executeQuery()) {
            while (resultSet.next()) {
                employees.add(new Employee(
                    resultSet.getInt("employeeId"),
                    resultSet.getString("name"),
                    resultSet.getString("department"),
                    resultSet.getDouble("salary"),
                    resultSet.getString("joiningDate")
                ));
            }
        } catch (SQLException e) {
            System.err.println("Error retrieving employees: " + e.getMessage());
            e.printStackTrace();
        }
        return employees;
    }
}
