package com.examly.service;

import com.examly.entity.Department;
import java.util.List;

public interface DepartmentService {
    String addDepartment(Department department); // Returns success or error message
    Department getDepartmentById(int departmentId);
    List<Department> getAllDepartments();
}
