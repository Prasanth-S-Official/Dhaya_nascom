package com.examly.service;

import com.examly.entity.Employee;
import java.util.List;

public interface EmployeeService {
    String addEmployee(Employee employee);
    String updateEmployee(Employee employee);
    String deleteEmployee(int employeeId);
    Employee getEmployeeById(int employeeId);
    List<Employee> getAllEmployees();
    List<Employee> searchByName(String name);
    List<Employee> filterByDepartmentName(String departmentName);
}
