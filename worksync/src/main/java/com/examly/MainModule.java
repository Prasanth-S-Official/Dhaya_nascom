package com.examly;

import com.examly.entity.Employee;
import com.examly.service.EmployeeService;
import com.examly.service.EmployeeServiceImpl;

import java.util.List;
import java.util.Scanner;

public class MainModule {
    private static final Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        EmployeeService employeeService = new EmployeeServiceImpl();

        while (true) {
            System.out.println("\nEmployee Management System");
            System.out.println("1. Add Employee");
            System.out.println("2. Update Employee");
            System.out.println("3. Delete Employee");
            System.out.println("4. View All Employees");
            System.out.println("5. Search Employee by Name");
            System.out.println("6. Filter Employees by Department Name");
            System.out.println("7. Exit");
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
                    searchEmployeeByName(employeeService);
                    break;
                case 6:
                    filterByDepartment(employeeService);
                    break;
                case 7:
                    System.out.println("Exiting...");
                    System.exit(0);
                    break;
                default:
                    System.out.println("Invalid choice! Please try again.");
            }
        }
    }

    private static void addEmployee(EmployeeService employeeService) {
        System.out.print("Enter employee name: ");
        String name = scanner.nextLine();
        System.out.print("Enter department name: ");
        String departmentName = scanner.nextLine();
        System.out.print("Enter email: ");
        String email = scanner.nextLine();
        System.out.print("Enter salary: ");
        double salary = scanner.nextDouble();
        scanner.nextLine();

        Employee employee = new Employee(0, name, departmentName, email, salary);
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

            System.out.print("Enter new department name (or press Enter to skip): ");
            String departmentNameInput = scanner.nextLine();
            if (!departmentNameInput.isEmpty()) {
                employee.setDepartmentName(departmentNameInput);
            }

            System.out.print("Enter new email (or press Enter to skip): ");
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
                System.out.println("Department Name: " + employee.getDepartmentName());
                System.out.println("Email: " + employee.getEmail());
                System.out.println("Salary: " + employee.getSalary());
                System.out.println("----------------------------");
            }
        }
    }

    private static void searchEmployeeByName(EmployeeService employeeService) {
        System.out.print("Enter employee name to search: ");
        String name = scanner.nextLine();

        List<Employee> employees = employeeService.searchByName(name);
        if (employees.isEmpty()) {
            System.out.println("No employees found with the name: " + name);
        } else {
            System.out.println("\nSearch Results:");
            for (Employee employee : employees) {
                System.out.println("ID: " + employee.getEmployeeId());
                System.out.println("Name: " + employee.getName());
                System.out.println("Department Name: " + employee.getDepartmentName());
                System.out.println("Email: " + employee.getEmail());
                System.out.println("Salary: " + employee.getSalary());
                System.out.println("----------------------------");
            }
        }
    }

    private static void filterByDepartment(EmployeeService employeeService) {
        System.out.print("Enter department name to filter: ");
        String departmentName = scanner.nextLine();

        List<Employee> employees = employeeService.filterByDepartmentName(departmentName);
        if (employees.isEmpty()) {
            System.out.println("No employees found in the department: " + departmentName);
        } else {
            System.out.println("\nEmployees in " + departmentName + " Department:");
            for (Employee employee : employees) {
                System.out.println("ID: " + employee.getEmployeeId());
                System.out.println("Name: " + employee.getName());
                System.out.println("Department Name: " + employee.getDepartmentName());
                System.out.println("Email: " + employee.getEmail());
                System.out.println("Salary: " + employee.getSalary());
                System.out.println("----------------------------");
            }
        }
    }
}
