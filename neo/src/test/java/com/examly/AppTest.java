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
    public void testAuthorFileExists() {
        String filePath = "src/main/java/com/examly/entity/Author.java";
        File file = new File(filePath);
        assertTrue(file.exists() && file.isFile());
    }

    @Test
    public void testBookFileExists() {
        String filePath = "src/main/java/com/examly/entity/Book.java";
        File file = new File(filePath);
        assertTrue(file.exists() && file.isFile());
    }

    @Test
    public void testAuthorServiceFileExists() {
        String filePath = "src/main/java/com/examly/service/AuthorService.java";
        File file = new File(filePath);
        assertTrue(file.exists() && file.isFile());
    }

    @Test
    public void testAuthorServiceImplFileExists() {
        String filePath = "src/main/java/com/examly/service/AuthorServiceImpl.java";
        File file = new File(filePath);
        assertTrue(file.exists() && file.isFile());
    }

    @Test
    public void testBookServiceFileExists() {
        String filePath = "src/main/java/com/examly/service/BookService.java";
        File file = new File(filePath);
        assertTrue(file.exists() && file.isFile());
    }

    @Test
    public void testBookServiceImplFileExists() {
        String filePath = "src/main/java/com/examly/service/BookServiceImpl.java";
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
    void testAuthorInsertQueryExists() throws IOException {
        // Read the service implementation file as a string
        String filePath = "src/main/java/com/examly/service/AuthorServiceImpl.java";  
        String fileContent = new String(Files.readAllBytes(Paths.get(filePath)));

        // Define a regex pattern to match the SQL query (case insensitive, ignoring spaces)
        String expectedPattern = "(?i)INSERT\\s+INTO\\s+authors\\s*\\(.*name.*biography.*\\)\\s*VALUES\\s*\\(.*\\)";

        // Normalize content and perform case-insensitive pattern matching
        assertTrue(fileContent.replaceAll("\\s+", " ").toLowerCase().matches(".*" + expectedPattern.toLowerCase() + ".*"), 
                   "Expected SQL insert query is missing in AuthorServiceImpl");
    }

    @Test
    void testAuthorUpdateQueryExists() throws IOException {
        // Read the service implementation file as a string
        String filePath = "src/main/java/com/examly/service/AuthorServiceImpl.java";  
        String fileContent = new String(Files.readAllBytes(Paths.get(filePath)));

        // Define a regex pattern to match the SQL query (case insensitive, ignoring spaces)
        String expectedPattern = "(?i)UPDATE\\s+authors\\s+SET\\s+name\\s*=.*biography\\s*=.*WHERE\\s+authorId\\s*=";

        // Normalize content and perform case-insensitive pattern matching
        assertTrue(fileContent.replaceAll("\\s+", " ").toLowerCase().matches(".*" + expectedPattern.toLowerCase() + ".*"), 
                   "Expected SQL update query is missing in AuthorServiceImpl");
    }

    @Test
    void testAuthorDeleteQueryExists() throws IOException {
        // Read the service implementation file as a string
        String filePath = "src/main/java/com/examly/service/AuthorServiceImpl.java";  
        String fileContent = new String(Files.readAllBytes(Paths.get(filePath)));

        // Define a regex pattern to match the SQL query (case insensitive, ignoring spaces)
        String expectedPattern = "(?i)DELETE\\s+FROM\\s+authors\\s+WHERE\\s+authorId\\s*=";

        // Normalize content and perform case-insensitive pattern matching
        assertTrue(fileContent.replaceAll("\\s+", " ").toLowerCase().matches(".*" + expectedPattern.toLowerCase() + ".*"), 
                   "Expected SQL delete query is missing in AuthorServiceImpl");
    }
    
    @Test
    void testBookInsertQueryExists() throws IOException {
        // Read the service implementation file as a string
        String filePath = "src/main/java/com/examly/service/BookServiceImpl.java";  
        String fileContent = new String(Files.readAllBytes(Paths.get(filePath)));

        // Define a regex pattern to match the SQL query (case insensitive, ignoring spaces)
        String expectedPattern = "(?i)INSERT\\s+INTO\\s+books\\s*\\(.*title.*authorId.*publishedDate.*price.*\\)\\s*VALUES\\s*\\(.*\\)";

        // Normalize content and perform case-insensitive pattern matching
        assertTrue(fileContent.replaceAll("\\s+", " ").toLowerCase().matches(".*" + expectedPattern.toLowerCase() + ".*"), 
                   "Expected SQL insert query is missing in BookServiceImpl");
    }

    @Test
    void testBookUpdateQueryExists() throws IOException {
        // Read the service implementation file as a string
        String filePath = "src/main/java/com/examly/service/BookServiceImpl.java";  
        String fileContent = new String(Files.readAllBytes(Paths.get(filePath)));

        // Define a regex pattern to match the SQL query (case insensitive, ignoring spaces)
        String expectedPattern = "(?i)UPDATE\\s+books\\s+SET\\s+title\\s*=.*authorId\\s*=.*publishedDate\\s*=.*price\\s*=.*WHERE\\s+bookId\\s*=";

        // Normalize content and perform case-insensitive pattern matching
        assertTrue(fileContent.replaceAll("\\s+", " ").toLowerCase().matches(".*" + expectedPattern.toLowerCase() + ".*"), 
                   "Expected SQL update query is missing in BookServiceImpl");
    }

    @Test
    void testBookDeleteQueryExists() throws IOException {
        // Read the service implementation file as a string
        String filePath = "src/main/java/com/examly/service/BookServiceImpl.java";  
        String fileContent = new String(Files.readAllBytes(Paths.get(filePath)));

        // Define a regex pattern to match the SQL query (case insensitive, ignoring spaces)
        String expectedPattern = "(?i)DELETE\\s+FROM\\s+books\\s+WHERE\\s+bookId\\s*=";

        // Normalize content and perform case-insensitive pattern matching
        assertTrue(fileContent.replaceAll("\\s+", " ").toLowerCase().matches(".*" + expectedPattern.toLowerCase() + ".*"), 
                   "Expected SQL delete query is missing in BookServiceImpl");
    }

}
