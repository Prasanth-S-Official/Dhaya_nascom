package com.examly;

import static org.junit.jupiter.api.Assertions.assertTrue;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.io.File;
import org.junit.jupiter.api.Test;

public class AppTest {
    @Test
    public void testEntityFolder() {
        String directoryPath = "src/main/java/com/examly/entity";
        File directory = new File(directoryPath);
        assertTrue(directory.exists() && directory.isDirectory());
    }

    @Test
    public void testServiceFolder() {
        String directoryPath = "src/main/java/com/examly/service";
        File directory = new File(directoryPath);
        assertTrue(directory.exists() && directory.isDirectory());
    }

    @Test
    public void testUtilFolder() {
        String directoryPath = "src/main/java/com/examly/util";
        File directory = new File(directoryPath);
        assertTrue(directory.exists() && directory.isDirectory());
    }

    @Test
    public void testDepartmentFileExists() {
        String filePath = "src/main/java/com/examly/entity/Department.java";
        File file = new File(filePath);
        assertTrue(file.exists() && file.isFile());
    }

    @Test
    public void testEmployeeFileExists() {
        String filePath = "src/main/java/com/examly/entity/Employee.java";
        File file = new File(filePath);
        assertTrue(file.exists() && file.isFile());
    }

    @Test
    public void testDepartmentServiceFileExists() {
        String filePath = "src/main/java/com/examly/service/DepartmentService.java";
        File file = new File(filePath);
        assertTrue(file.exists() && file.isFile());
    }

    @Test
    public void testDepartmentServiceImplFileExists() {
        String filePath = "src/main/java/com/examly/service/DepartmentServiceImpl.java";
        File file = new File(filePath);
        assertTrue(file.exists() && file.isFile());
    }

    @Test
    public void testEmployeeServiceFileExists() {
        String filePath = "src/main/java/com/examly/service/EmployeeService.java";
        File file = new File(filePath);
        assertTrue(file.exists() && file.isFile());
    }

    @Test
    public void testEmployeeServiceImplFileExists() {
        String filePath = "src/main/java/com/examly/service/EmployeeServiceImpl.java";
        File file = new File(filePath);
        assertTrue(file.exists() && file.isFile());
    }

    @Test
    public void testDBConnectionUtilFileExists() {
        String filePath = "src/main/java/com/examly/util/DBConnectionUtil.java";
        File file = new File(filePath);
        assertTrue(file.exists() && file.isFile());
    }

    @Test
    void testDepartmentInsertQueryExists() throws IOException {
        String filePath = "src/main/java/com/examly/service/DepartmentServiceImpl.java";
        String fileContent = new String(Files.readAllBytes(Paths.get(filePath)));
        String expectedPattern = "(?i)INSERT\\s+INTO\\s+departments\\s*\\(.*departmentName.*location.*\\)\\s*VALUES\\s*\\(.*\\)";
        assertTrue(fileContent.replaceAll("\\s+", " ").toLowerCase().matches(".*" + expectedPattern.toLowerCase() + ".*"), "Expected SQL insert query is missing in DepartmentServiceImpl");
    }

    @Test
    void testEmployeeInsertQueryExists() throws IOException {
        String filePath = "src/main/java/com/examly/service/EmployeeServiceImpl.java";
        String fileContent = new String(Files.readAllBytes(Paths.get(filePath)));
        String expectedPattern = "(?i)INSERT\\s+INTO\\s+employees\\s*\\(.*name.*departmentId.*email.*salary.*\\)\\s*VALUES\\s*\\(.*\\)";
        assertTrue(fileContent.replaceAll("\\s+", " ").toLowerCase().matches(".*" + expectedPattern.toLowerCase() + ".*"), "Expected SQL insert query is missing in EmployeeServiceImpl");
    }

    @Test
    void testEmployeeUpdateQueryExists() throws IOException {
        String filePath = "src/main/java/com/examly/service/EmployeeServiceImpl.java";
        String fileContent = new String(Files.readAllBytes(Paths.get(filePath)));
        String expectedPattern = "(?i)UPDATE\\s+employees\\s+SET\\s+name\\s*=.*departmentId\\s*=.*email\\s*=.*salary\\s*=.*WHERE\\s+employeeId\\s*=";
        assertTrue(fileContent.replaceAll("\\s+", " ").toLowerCase().matches(".*" + expectedPattern.toLowerCase() + ".*"), "Expected SQL update query is missing in EmployeeServiceImpl");
    }

    @Test
    void testEmployeeDeleteQueryExists() throws IOException {
        String filePath = "src/main/java/com/examly/service/EmployeeServiceImpl.java";
        String fileContent = new String(Files.readAllBytes(Paths.get(filePath)));
        String expectedPattern = "(?i)DELETE\\s+FROM\\s+employees\\s+WHERE\\s+employeeId\\s*=";
        assertTrue(fileContent.replaceAll("\\s+", " ").toLowerCase().matches(".*" + expectedPattern.toLowerCase() + ".*"), "Expected SQL delete query is missing in EmployeeServiceImpl");
    }
}
