package com.examly.service;

import com.examly.entity.Employee;
import com.examly.entity.Department;
import com.examly.util.DBConnectionUtil;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class EmployeeServiceImpl implements EmployeeService {

    private Connection connection;
    private DepartmentService departmentService; // To validate department existence

    public EmployeeServiceImpl() {
        connection = DBConnectionUtil.getConnection();
        departmentService = new DepartmentServiceImpl();
    }

    @Override
    public String addEmployee(Employee employee) {
        // Validate employee name
        if (employee.getName() == null || employee.getName().isEmpty()) {
            return "Error: Employee name cannot be empty.";
        }

        // Validate departmentId (check if department exists)
        Department department = departmentService.getDepartmentById(employee.getDepartmentId());
        if (department == null) {
            return "Error: Department with ID " + employee.getDepartmentId() + " does not exist.";
        }

        // Validate salary
        if (employee.getSalary() <= 0) {
            return "Error: Salary must be greater than zero.";
        }

        // Validate email
        if (employee.getEmail() == null || employee.getEmail().isEmpty()) {
            return "Error: Email cannot be empty.";
        }

        // Insert into database
        String query = "INSERT INTO employees (name, departmentId, email, salary) VALUES (?, ?, ?, ?)";
        try (PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setString(1, employee.getName());
            statement.setInt(2, employee.getDepartmentId());
            statement.setString(3, employee.getEmail());
            statement.setDouble(4, employee.getSalary());

            int rowsInserted = statement.executeUpdate();
            return (rowsInserted > 0) ? "Employee added successfully!" : "Error: Failed to add employee.";
        } catch (SQLException e) {
            return "Database error: " + e.getMessage();
        }
    }

    @Override
    public String updateEmployee(Employee employee) {
        // Validate departmentId (check if department exists)
        Department department = departmentService.getDepartmentById(employee.getDepartmentId());
        if (department == null) {
            return "Error: Department with ID " + employee.getDepartmentId() + " does not exist.";
        }

        String query = "UPDATE employees SET name = ?, departmentId = ?, email = ?, salary = ? WHERE employeeId = ?";
        try (PreparedStatement statement = connection.prepareStatement(query)) {
            statement.setString(1, employee.getName());
            statement.setInt(2, employee.getDepartmentId());
            statement.setString(3, employee.getEmail());
            statement.setDouble(4, employee.getSalary());
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
                        resultSet.getInt("departmentId"),
                        resultSet.getString("email"),
                        resultSet.getDouble("salary")
                    );
                } else {
                    System.out.println("No employee found with ID: " + employeeId);
                }
            }
        } catch (SQLException e) {
            System.err.println("Error retrieving employee: " + e.getMessage());
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
                    resultSet.getInt("departmentId"),
                    resultSet.getString("email"),
                    resultSet.getDouble("salary")
                ));
            }
        } catch (SQLException e) {
            System.err.println("Error retrieving employees: " + e.getMessage());
        }
        return employees;
    }
}
