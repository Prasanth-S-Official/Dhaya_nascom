package com.examly;

import com.examly.entity.Product;
import com.examly.service.ProductService;
import com.examly.service.ProductServiceImpl;

import java.util.List;
import java.util.Scanner;

public class MainModule {
    private static final Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        ProductService productService = new ProductServiceImpl();

        while (true) {
            System.out.println("\nProduct Management System");
            System.out.println("1. Add Product");
            System.out.println("2. Update Product");
            System.out.println("3. Delete Product");
            System.out.println("4. View All Products");
            System.out.println("5. Search Product by Name");
            System.out.println("6. Filter Products by Category");
            System.out.println("7. Exit");
            System.out.print("Enter your choice: ");
            int choice = scanner.nextInt();
            scanner.nextLine();

            switch (choice) {
                case 1:
                    addProduct(productService);
                    break;
                case 2:
                    updateProduct(productService);
                    break;
                case 3:
                    deleteProduct(productService);
                    break;
                case 4:
                    viewAllProducts(productService);
                    break;
                case 5:
                    searchProductByName(productService);
                    break;
                case 6:
                    filterByCategory(productService);
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

    private static void addProduct(ProductService productService) {
        System.out.print("Enter product name: ");
        String name = scanner.nextLine();
        System.out.print("Enter category name: ");
        String categoryName = scanner.nextLine();
        System.out.print("Enter price: ");
        double price = scanner.nextDouble();
        System.out.print("Enter stock quantity: ");
        int stockQuantity = scanner.nextInt();
        scanner.nextLine();

        Product product = new Product(0, name, categoryName, price, stockQuantity);
        String result = productService.addProduct(product);
        System.out.println(result);
    }

    private static void updateProduct(ProductService productService) {
        System.out.print("Enter product ID to update: ");
        int productId = scanner.nextInt();
        scanner.nextLine();

        Product product = productService.getProductById(productId);
        if (product != null) {
            System.out.print("Enter new name (or press Enter to skip): ");
            String name = scanner.nextLine();
            if (!name.isEmpty()) {
                product.setName(name);
            }

            System.out.print("Enter new category name (or press Enter to skip): ");
            String categoryNameInput = scanner.nextLine();
            if (!categoryNameInput.isEmpty()) {
                product.setCategoryName(categoryNameInput);
            }

            System.out.print("Enter new price (or press Enter to skip): ");
            String priceInput = scanner.nextLine();
            if (!priceInput.isEmpty()) {
                product.setPrice(Double.parseDouble(priceInput));
            }

            System.out.print("Enter new stock quantity (or press Enter to skip): ");
            String stockInput = scanner.nextLine();
            if (!stockInput.isEmpty()) {
                product.setStockQuantity(Integer.parseInt(stockInput));
            }

            String result = productService.updateProduct(product);
            System.out.println(result);
        } else {
            System.out.println("Error: Product not found!");
        }
    }

    private static void deleteProduct(ProductService productService) {
        System.out.print("Enter product ID to delete: ");
        int productId = scanner.nextInt();
        scanner.nextLine();

        String result = productService.deleteProduct(productId);
        System.out.println(result);
    }

    private static void viewAllProducts(ProductService productService) {
        List<Product> products = productService.getAllProducts();
        if (products.isEmpty()) {
            System.out.println("No products available.");
        } else {
            for (Product product : products) {
                System.out.println("ID: " + product.getProductId());
                System.out.println("Name: " + product.getName());
                System.out.println("Category: " + product.getCategoryName());
                System.out.println("Price: " + product.getPrice());
                System.out.println("Stock Quantity: " + product.getStockQuantity());
                System.out.println("----------------------------");
            }
        }
    }

    private static void searchProductByName(ProductService productService) {
        System.out.print("Enter product name to search: ");
        String name = scanner.nextLine();

        List<Product> products = productService.searchByName(name);
        if (products.isEmpty()) {
            System.out.println("No products found with the name: " + name);
        } else {
            System.out.println("\nSearch Results:");
            for (Product product : products) {
                System.out.println("ID: " + product.getProductId());
                System.out.println("Name: " + product.getName());
                System.out.println("Category: " + product.getCategoryName());
                System.out.println("Price: " + product.getPrice());
                System.out.println("Stock Quantity: " + product.getStockQuantity());
                System.out.println("----------------------------");
            }
        }
    }

    private static void filterByCategory(ProductService productService) {
        System.out.print("Enter category name to filter: ");
        String categoryName = scanner.nextLine();

        List<Product> products = productService.filterByCategory(categoryName);
        if (products.isEmpty()) {
            System.out.println("No products found in the category: " + categoryName);
        } else {
            System.out.println("\nProducts in " + categoryName + " Category:");
            for (Product product : products) {
                System.out.println("ID: " + product.getProductId());
                System.out.println("Name: " + product.getName());
                System.out.println("Category: " + product.getCategoryName());
                System.out.println("Price: " + product.getPrice());
                System.out.println("Stock Quantity: " + product.getStockQuantity());
                System.out.println("----------------------------");
            }
        }
    }
}
