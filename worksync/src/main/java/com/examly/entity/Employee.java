package com.examly.entity;

public class Employee {
    private int employeeId;
    private String name;
    private int departmentId;
    private String email;
    private double salary;

    public Employee(int employeeId, String name, int departmentId, String email, double salary) {
        this.employeeId = employeeId;
        this.name = name;
        this.departmentId = departmentId;
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

    public int getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(int departmentId) {
        this.departmentId = departmentId;
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
