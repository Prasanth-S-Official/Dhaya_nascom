package com.examly;

import com.examly.entity.Employee;
import com.examly.entity.Department;
import com.examly.service.EmployeeService;
import com.examly.service.DepartmentService;
import com.examly.service.EmployeeServiceImpl;
import com.examly.service.DepartmentServiceImpl;

import java.util.List;
import java.util.Scanner;

public class MainModule {
    private static final Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        EmployeeService employeeService = new EmployeeServiceImpl();
        DepartmentService departmentService = new DepartmentServiceImpl();

        while (true) {
            System.out.println("\nEmployee Management System");
            System.out.println("1. Manage Employees");
            System.out.println("2. Manage Departments");
            System.out.println("3. Exit");
            System.out.print("Enter your choice: ");
            int choice = scanner.nextInt();
            scanner.nextLine();

            switch (choice) {
                case 1:
                    manageEmployees(employeeService);
                    break;
                case 2:
                    manageDepartments(departmentService);
                    break;
                case 3:
                    System.out.println("Exiting...");
                    System.exit(0);
                    break;
                default:
                    System.out.println("Invalid choice! Please try again.");
            }
        }
    }

    private static void manageEmployees(EmployeeService employeeService) {
        while (true) {
            System.out.println("\nManage Employees");
            System.out.println("1. Add Employee");
            System.out.println("2. Update Employee");
            System.out.println("3. Delete Employee");
            System.out.println("4. View All Employees");
            System.out.println("5. Back");
            System.out.print("Enter your choice: ");
            int choice = scanner.nextInt();
            scanner.nextLine();

            switch (choice) {
                case 1:
                    addEmployee(employeeService);
                    break;
                case 2:
                    updateEmployee(employeeService);
                    break;
                case 3:
                    deleteEmployee(employeeService);
                    break;
                case 4:
                    viewAllEmployees(employeeService);
                    break;
                case 5:
                    return;
                default:
                    System.out.println("Invalid choice! Please try again.");
            }
        }
    }

    private static void addEmployee(EmployeeService employeeService) {
        System.out.print("Enter employee name: ");
        String name = scanner.nextLine();
        System.out.print("Enter department ID: ");
        int departmentId = scanner.nextInt();
        scanner.nextLine();
        System.out.print("Enter email: ");
        String email = scanner.nextLine();
        System.out.print("Enter salary: ");
        double salary = scanner.nextDouble();
        scanner.nextLine();

        Employee employee = new Employee(0, name, departmentId, email, salary);
        String result = employeeService.addEmployee(employee);
        System.out.println(result);
    }

    private static void updateEmployee(EmployeeService employeeService) {
        System.out.print("Enter employee ID to update: ");
        int employeeId = scanner.nextInt();
        scanner.nextLine();

        Employee employee = employeeService.getEmployeeById(employeeId);
        if (employee != null) {
            System.out.print("Enter new name (or press Enter to skip): ");
            String name = scanner.nextLine();
            if (!name.isEmpty()) {
                employee.setName(name);
            }

            System.out.print("Enter new department ID (or press Enter to skip): ");
            String departmentIdInput = scanner.nextLine();
            if (!departmentIdInput.isEmpty()) {
                employee.setDepartmentId(Integer.parseInt(departmentIdInput));
            }

            System.out.print("Enter new email (or press Enter to skip): "); // ✅ Fix: Allow updating email
            String emailInput = scanner.nextLine();
            if (!emailInput.isEmpty()) {
                employee.setEmail(emailInput);
            }

            System.out.print("Enter new salary (or press Enter to skip): ");
            String salaryInput = scanner.nextLine();
            if (!salaryInput.isEmpty()) {
                employee.setSalary(Double.parseDouble(salaryInput));
            }

            String result = employeeService.updateEmployee(employee);
            System.out.println(result);
        } else {
            System.out.println("Error: Employee not found!");
        }
    }

    private static void deleteEmployee(EmployeeService employeeService) {
        System.out.print("Enter employee ID to delete: ");
        int employeeId = scanner.nextInt();
        scanner.nextLine();

        String result = employeeService.deleteEmployee(employeeId);
        System.out.println(result);
    }

    private static void viewAllEmployees(EmployeeService employeeService) {
        List<Employee> employees = employeeService.getAllEmployees();
        if (employees.isEmpty()) {
            System.out.println("No employees available.");
        } else {
            for (Employee employee : employees) {
                System.out.println("ID: " + employee.getEmployeeId());
                System.out.println("Name: " + employee.getName());
                System.out.println("Department ID: " + employee.getDepartmentId());
                System.out.println("Email: " + employee.getEmail()); // ✅ Fix: Display Email
                System.out.println("Salary: " + employee.getSalary());
                System.out.println("----------------------------");
            }
        }
    }

    private static void manageDepartments(DepartmentService departmentService) {
        while (true) {
            System.out.println("\nManage Departments");
            System.out.println("1. Add Department");
            System.out.println("2. View All Departments");
            System.out.println("3. Back");
            System.out.print("Enter your choice: ");
            int choice = scanner.nextInt();
            scanner.nextLine();

            switch (choice) {
                case 1:
                    addDepartment(departmentService);
                    break;
                case 2:
                    viewAllDepartments(departmentService);
                    break;
                case 3:
                    return;
                default:
                    System.out.println("Invalid choice! Please try again.");
            }
        }
    }

    private static void addDepartment(DepartmentService departmentService) {
        System.out.print("Enter department name: ");
        String name = scanner.nextLine();
        System.out.print("Enter department location: ");
        String location = scanner.nextLine();

        Department department = new Department(0, name, location);
        String result = departmentService.addDepartment(department);
        System.out.println(result);
    }

    private static void viewAllDepartments(DepartmentService departmentService) {
        List<Department> departments = departmentService.getAllDepartments();
        if (departments.isEmpty()) {
            System.out.println("No departments available.");
        } else {
            for (Department department : departments) {
                System.out.println("ID: " + department.getDepartmentId());
                System.out.println("Name: " + department.getDepartmentName());
                System.out.println("Location: " + department.getLocation());
                System.out.println("----------------------------");
            }
        }
    }
}
