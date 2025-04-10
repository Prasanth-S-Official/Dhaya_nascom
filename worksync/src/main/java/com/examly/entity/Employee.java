package com.examly.entity;

public class Employee {
    private int employeeId;
    private String name;
    private String departmentName; // Storing department as a string instead of using a separate entity
    private String email;
    private double salary;

    public Employee(int employeeId, String name, String departmentName, String email, double salary) {
        this.employeeId = employeeId;
        this.name = name;
        this.departmentName = departmentName;
        this.email = email;
        this.salary = salary;
    }

    public Employee() {}

    // Getters and Setters
    public int getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(int employeeId) {
        this.employeeId = employeeId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }
}
