package com.examly.service;

import com.examly.entity.Department;
import java.util.List;

public interface DepartmentService {
    String addDepartment(Department department);
    Department getDepartmentById(int departmentId);
    List<Department> getAllDepartments();
}
