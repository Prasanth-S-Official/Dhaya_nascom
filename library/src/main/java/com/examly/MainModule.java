package com.examly;

import com.examly.entity.Book;
import com.examly.service.BookService;
import com.examly.service.BookServiceImpl;

import java.util.List;
import java.util.Scanner;

public class MainModule {
    private static final Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        BookService bookService = new BookServiceImpl();

        while (true) {
            System.out.println("\nLibrary Book Management System");
            System.out.println("1. Add Book");
            System.out.println("2. Update Book");
            System.out.println("3. Delete Book");
            System.out.println("4. View All Books");
            System.out.println("5. Search by Title");
            System.out.println("6. Filter by Author Name");
            System.out.println("7. Exit");
            System.out.print("Enter your choice: ");
            int choice = scanner.nextInt();
            scanner.nextLine();

            switch (choice) {
                case 1:
                    addBook(bookService);
                    break;
                case 2:
                    updateBook(bookService);
                    break;
                case 3:
                    deleteBook(bookService);
                    break;
                case 4:
                    viewAllBooks(bookService);
                    break;
                case 5:
                    searchByTitle(bookService);
                    break;
                case 6:
                    filterByAuthorName(bookService);
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

    private static void addBook(BookService bookService) {
        System.out.print("Enter book title: ");
        String title = scanner.nextLine();
        System.out.print("Enter author name: ");
        String authorName = scanner.nextLine();
        System.out.print("Enter published date (YYYY-MM-DD): ");
        String publishedDate = scanner.nextLine();
        System.out.print("Enter book price: ");
        double price = scanner.nextDouble();
        scanner.nextLine();

        Book book = new Book(0, title, authorName, price, publishedDate);
        String result = bookService.addBook(book);
        System.out.println(result);
    }

    private static void updateBook(BookService bookService) {
        System.out.print("Enter book ID to update: ");
        int bookId = scanner.nextInt();
        scanner.nextLine();

        Book book = bookService.getBookById(bookId);
        if (book != null) {
            System.out.print("Enter new title (or press Enter to skip): ");
            String title = scanner.nextLine();
            if (!title.isEmpty()) {
                book.setTitle(title);
            }

            System.out.print("Enter new author name (or press Enter to skip): ");
            String authorName = scanner.nextLine();
            if (!authorName.isEmpty()) {
                book.setAuthorName(authorName);
            }

            System.out.print("Enter new published date (YYYY-MM-DD, or press Enter to skip): ");
            String publishedDate = scanner.nextLine();
            if (!publishedDate.isEmpty()) {
                book.setPublishedDate(publishedDate);
            }

            System.out.print("Enter new price (or press Enter to skip): ");
            String priceInput = scanner.nextLine();
            if (!priceInput.isEmpty()) {
                book.setPrice(Double.parseDouble(priceInput));
            }

            String result = bookService.updateBook(book);
            System.out.println(result);
        } else {
            System.out.println("Error: Book not found!");
        }
    }

    private static void deleteBook(BookService bookService) {
        System.out.print("Enter book ID to delete: ");
        int bookId = scanner.nextInt();
        scanner.nextLine();

        bookService.deleteBook(bookId);
        System.out.println("Book deleted successfully!");
    }

    private static void viewAllBooks(BookService bookService) {
        List<Book> books = bookService.getAllBooks();
        if (books.isEmpty()) {
            System.out.println("No books available.");
        } else {
            books.forEach(book -> {
                System.out.println("ID: " + book.getBookId());
                System.out.println("Title: " + book.getTitle());
                System.out.println("Author Name: " + book.getAuthorName());
                System.out.println("Published Date: " + book.getPublishedDate());
                System.out.println("Price: " + book.getPrice());
                System.out.println("----------------------------");
            });
        }
    }

    private static void searchByTitle(BookService bookService) {
        System.out.print("Enter book title to search: ");
        String title = scanner.nextLine();
        List<Book> books = bookService.searchByTitle(title);
        if (books.isEmpty()) {
            System.out.println("No books found with the given title.");
        } else {
            books.forEach(book -> {
                System.out.println("ID: " + book.getBookId());
                System.out.println("Title: " + book.getTitle());
                System.out.println("Author Name: " + book.getAuthorName());
                System.out.println("Published Date: " + book.getPublishedDate());
                System.out.println("Price: " + book.getPrice());
                System.out.println("----------------------------");
            });
        }
    }

    private static void filterByAuthorName(BookService bookService) {
        System.out.print("Enter author name to filter: ");
        String authorName = scanner.nextLine();
        List<Book> books = bookService.filterByAuthorName(authorName);
        if (books.isEmpty()) {
            System.out.println("No books found for the given author.");
        } else {
            books.forEach(book -> {
                System.out.println("ID: " + book.getBookId());
                System.out.println("Title: " + book.getTitle());
                System.out.println("Author Name: " + book.getAuthorName());
                System.out.println("Published Date: " + book.getPublishedDate());
                System.out.println("Price: " + book.getPrice());
                System.out.println("----------------------------");
            });
        }
    }
}
