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
    public void testBookFileExists() {
        String filePath = "src/main/java/com/examly/entity/Book.java";
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
    void testBookInsertQueryExists() throws IOException {
        String filePath = "src/main/java/com/examly/service/BookServiceImpl.java";  
        String fileContent = new String(Files.readAllBytes(Paths.get(filePath)));

        String expectedPattern = "(?i)INSERT\\s+INTO\\s+books\\s*\\(.*title.*authorName.*publishedDate.*price.*\\)\\s*VALUES\\s*\\(.*\\)";

        assertTrue(fileContent.replaceAll("\\s+", " ").toLowerCase().matches(".*" + expectedPattern.toLowerCase() + ".*"), 
                   "Expected SQL insert query is missing in BookServiceImpl");
    }

    @Test
    void testBookUpdateQueryExists() throws IOException {
        String filePath = "src/main/java/com/examly/service/BookServiceImpl.java";  
        String fileContent = new String(Files.readAllBytes(Paths.get(filePath)));

        String expectedPattern = "(?i)UPDATE\\s+books\\s+SET\\s+title\\s*=.*authorName\\s*=.*publishedDate\\s*=.*price\\s*=.*WHERE\\s+bookId\\s*=";

        assertTrue(fileContent.replaceAll("\\s+", " ").toLowerCase().matches(".*" + expectedPattern.toLowerCase() + ".*"), 
                   "Expected SQL update query is missing in BookServiceImpl");
    }

    @Test
    void testBookDeleteQueryExists() throws IOException {
        String filePath = "src/main/java/com/examly/service/BookServiceImpl.java";  
        String fileContent = new String(Files.readAllBytes(Paths.get(filePath)));

        String expectedPattern = "(?i)DELETE\\s+FROM\\s+books\\s+WHERE\\s+bookId\\s*=";

        assertTrue(fileContent.replaceAll("\\s+", " ").toLowerCase().matches(".*" + expectedPattern.toLowerCase() + ".*"), 
                   "Expected SQL delete query is missing in BookServiceImpl");
    }

    @Test
    void testBookSelectByIdQueryExists() throws IOException {
        String filePath = "src/main/java/com/examly/service/BookServiceImpl.java";  
        String fileContent = new String(Files.readAllBytes(Paths.get(filePath)));

        String expectedPattern = "(?i)SELECT\\s+\\*\\s+FROM\\s+books\\s+WHERE\\s+bookId\\s*=";

        assertTrue(fileContent.replaceAll("\\s+", " ").toLowerCase().matches(".*" + expectedPattern.toLowerCase() + ".*"), 
                   "Expected SQL select by ID query is missing in BookServiceImpl");
    }

    @Test
    void testBookSelectAllQueryExists() throws IOException {
        String filePath = "src/main/java/com/examly/service/BookServiceImpl.java";  
        String fileContent = new String(Files.readAllBytes(Paths.get(filePath)));

        String expectedPattern = "(?i)SELECT\\s+\\*\\s+FROM\\s+books";

        assertTrue(fileContent.replaceAll("\\s+", " ").toLowerCase().matches(".*" + expectedPattern.toLowerCase() + ".*"), 
                   "Expected SQL select all query is missing in BookServiceImpl");
    }

    @Test
    void testBookSearchByTitleQueryExists() throws IOException {
        String filePath = "src/main/java/com/examly/service/BookServiceImpl.java";  
        String fileContent = new String(Files.readAllBytes(Paths.get(filePath)));

        String expectedPattern = "(?i)SELECT\\s+\\*\\s+FROM\\s+books\\s+WHERE\\s+title\\s+LIKE";

        assertTrue(fileContent.replaceAll("\\s+", " ").toLowerCase().matches(".*" + expectedPattern.toLowerCase() + ".*"), 
                   "Expected SQL search by title query is missing in BookServiceImpl");
    }

    @Test
    void testBookFilterByAuthorNameQueryExists() throws IOException {
        String filePath = "src/main/java/com/examly/service/BookServiceImpl.java";  
        String fileContent = new String(Files.readAllBytes(Paths.get(filePath)));

        String expectedPattern = "(?i)SELECT\\s+\\*\\s+FROM\\s+books\\s+WHERE\\s+authorName\\s*=";

        assertTrue(fileContent.replaceAll("\\s+", " ").toLowerCase().matches(".*" + expectedPattern.toLowerCase() + ".*"), 
                   "Expected SQL filter by author name query is missing in BookServiceImpl");
    }

}
