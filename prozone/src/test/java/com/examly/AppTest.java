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
    public void testProductFileExists() {
        String filePath = "src/main/java/com/examly/entity/Product.java";
        File file = new File(filePath);
        assertTrue(file.exists() && file.isFile());
    }

    @Test
    public void testProductServiceFileExists() {
        String filePath = "src/main/java/com/examly/service/ProductService.java";
        File file = new File(filePath);
        assertTrue(file.exists() && file.isFile());
    }

    @Test
    public void testProductServiceImplFileExists() {
        String filePath = "src/main/java/com/examly/service/ProductServiceImpl.java";
        File file = new File(filePath);
        assertTrue(file.exists() && file.isFile());
    }

    @Test
    void testProductInsertQueryExists() throws IOException {
        String filePath = "src/main/java/com/examly/service/ProductServiceImpl.java";  
        String fileContent = new String(Files.readAllBytes(Paths.get(filePath)));

        String expectedPattern = "(?i)INSERT\\s+INTO\\s+products\\s*\\(.*name.*categoryName.*price.*stockQuantity.*\\)\\s*VALUES\\s*\\(.*\\)";

        assertTrue(fileContent.replaceAll("\\s+", " ").toLowerCase().matches(".*" + expectedPattern.toLowerCase() + ".*"), 
                   "Expected SQL insert query is missing in ProductServiceImpl");
    }

    @Test
    void testProductUpdateQueryExists() throws IOException {
        String filePath = "src/main/java/com/examly/service/ProductServiceImpl.java";  
        String fileContent = new String(Files.readAllBytes(Paths.get(filePath)));

        String expectedPattern = "(?i)UPDATE\\s+products\\s+SET\\s+name\\s*=.*categoryName\\s*=.*price\\s*=.*stockQuantity\\s*=.*WHERE\\s+productId\\s*=";

        assertTrue(fileContent.replaceAll("\\s+", " ").toLowerCase().matches(".*" + expectedPattern.toLowerCase() + ".*"), 
                   "Expected SQL update query is missing in ProductServiceImpl");
    }

    @Test
    void testProductDeleteQueryExists() throws IOException {
        String filePath = "src/main/java/com/examly/service/ProductServiceImpl.java";  
        String fileContent = new String(Files.readAllBytes(Paths.get(filePath)));

        String expectedPattern = "(?i)DELETE\\s+FROM\\s+products\\s+WHERE\\s+productId\\s*=";

        assertTrue(fileContent.replaceAll("\\s+", " ").toLowerCase().matches(".*" + expectedPattern.toLowerCase() + ".*"), 
                   "Expected SQL delete query is missing in ProductServiceImpl");
    }

    @Test
    void testProductSelectByIdQueryExists() throws IOException {
        String filePath = "src/main/java/com/examly/service/ProductServiceImpl.java";  
        String fileContent = new String(Files.readAllBytes(Paths.get(filePath)));

        String expectedPattern = "(?i)SELECT\\s+\\*\\s+FROM\\s+products\\s+WHERE\\s+productId\\s*=";

        assertTrue(fileContent.replaceAll("\\s+", " ").toLowerCase().matches(".*" + expectedPattern.toLowerCase() + ".*"), 
                   "Expected SQL select by ID query is missing in ProductServiceImpl");
    }

    @Test
    void testProductSelectAllQueryExists() throws IOException {
        String filePath = "src/main/java/com/examly/service/ProductServiceImpl.java";  
        String fileContent = new String(Files.readAllBytes(Paths.get(filePath)));

        String expectedPattern = "(?i)SELECT\\s+\\*\\s+FROM\\s+products";

        assertTrue(fileContent.replaceAll("\\s+", " ").toLowerCase().matches(".*" + expectedPattern.toLowerCase() + ".*"), 
                   "Expected SQL select all query is missing in ProductServiceImpl");
    }

    @Test
    void testProductSearchByNameQueryExists() throws IOException {
        String filePath = "src/main/java/com/examly/service/ProductServiceImpl.java";  
        String fileContent = new String(Files.readAllBytes(Paths.get(filePath)));

        String expectedPattern = "(?i)SELECT\\s+\\*\\s+FROM\\s+products\\s+WHERE\\s+name\\s+LIKE";

        assertTrue(fileContent.replaceAll("\\s+", " ").toLowerCase().matches(".*" + expectedPattern.toLowerCase() + ".*"), 
                   "Expected SQL search by name query is missing in ProductServiceImpl");
    }

    @Test
    void testProductFilterByCategoryQueryExists() throws IOException {
        String filePath = "src/main/java/com/examly/service/ProductServiceImpl.java";  
        String fileContent = new String(Files.readAllBytes(Paths.get(filePath)));

        String expectedPattern = "(?i)SELECT\\s+\\*\\s+FROM\\s+products\\s+WHERE\\s+categoryName\\s*=";

        assertTrue(fileContent.replaceAll("\\s+", " ").toLowerCase().matches(".*" + expectedPattern.toLowerCase() + ".*"), 
                   "Expected SQL filter by category name query is missing in ProductServiceImpl");
    }
}
