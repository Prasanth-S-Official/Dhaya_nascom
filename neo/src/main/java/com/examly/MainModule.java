package com.examly;

import com.examly.entity.Book;
import com.examly.entity.Author;
import com.examly.service.BookService;
import com.examly.service.AuthorService;
import com.examly.service.BookServiceImpl;
import com.examly.service.AuthorServiceImpl;

import java.util.List;
import java.util.Scanner;

public class MainModule {
    private static final Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        BookService bookService = new BookServiceImpl();
        AuthorService authorService = new AuthorServiceImpl();

        while (true) {
            System.out.println("\nLibrary Book Management System");
            System.out.println("1. Manage Books");
            System.out.println("2. Manage Authors");
            System.out.println("3. Exit");
            System.out.print("Enter your choice: ");
            int choice = scanner.nextInt();
            scanner.nextLine();  // Consume newline

            switch (choice) {
                case 1:
                    manageBooks(bookService);
                    break;
                case 2:
                    manageAuthors(authorService);
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

    private static void manageBooks(BookService bookService) {
        while (true) {
            System.out.println("\nManage Books");
            System.out.println("1. Add Book");
            System.out.println("2. Update Book");
            System.out.println("3. Delete Book");
            System.out.println("4. View All Books");
            System.out.println("5. Back");
            System.out.print("Enter your choice: ");
            int choice = scanner.nextInt();
            scanner.nextLine();  // Consume newline

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
                    return;
                default:
                    System.out.println("Invalid choice! Please try again.");
            }
        }
    }

    private static void addBook(BookService bookService) {
        System.out.print("Enter book title: ");
        String title = scanner.nextLine();
        System.out.print("Enter author ID: ");
        int authorId = scanner.nextInt();
        scanner.nextLine();  
        System.out.print("Enter published date (YYYY-MM-DD): ");
        String publishedDate = scanner.nextLine();
        System.out.print("Enter book price: ");
        double price = scanner.nextDouble();
        scanner.nextLine();  
    
        Book book = new Book(0, title, authorId, price, publishedDate);
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
    
            System.out.print("Enter new author ID (or press Enter to skip): ");
            String authorIdInput = scanner.nextLine();
            if (!authorIdInput.isEmpty()) {
                book.setAuthorId(Integer.parseInt(authorIdInput));
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
        scanner.nextLine();  // Consume newline

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
                System.out.println("Author ID: " + book.getAuthorId()); // Shows only author ID
                System.out.println("Published Date: " + book.getPublishedDate());
                System.out.println("Price: " + book.getPrice());
                System.out.println("----------------------------");
            });
        }
    }

    private static void manageAuthors(AuthorService authorService) {
        while (true) {
            System.out.println("\nManage Authors");
            System.out.println("1. Add Author");
            System.out.println("2. Update Author");
            System.out.println("3. Delete Author");
            System.out.println("4. View All Authors");
            System.out.println("5. Back");
            System.out.print("Enter your choice: ");
            int choice = scanner.nextInt();
            scanner.nextLine();  // Consume newline

            switch (choice) {
                case 1:
                    addAuthor(authorService);
                    break;
                case 2:
                    updateAuthor(authorService);
                    break;
                case 3:
                    deleteAuthor(authorService);
                    break;
                case 4:
                    viewAllAuthors(authorService);
                    break;
                case 5:
                    return;
                default:
                    System.out.println("Invalid choice! Please try again.");
            }
        }
    }

    private static void addAuthor(AuthorService authorService) {
        System.out.print("Enter author name: ");
        String name = scanner.nextLine();
        System.out.print("Enter author biography: ");
        String biography = scanner.nextLine();

        Author author = new Author(0, name, biography);
        authorService.addAuthor(author);
        System.out.println("Author added successfully!");
    }

    private static void updateAuthor(AuthorService authorService) {
        System.out.print("Enter author ID to update: ");
        int authorId = scanner.nextInt();
        scanner.nextLine();  // Consume newline

        Author author = authorService.getAuthorById(authorId);
        if (author != null) {
            System.out.print("Enter new name (or press Enter to skip): ");
            String name = scanner.nextLine();
            if (!name.isEmpty()) {
                author.setName(name);
            }

            System.out.print("Enter new biography (or press Enter to skip): ");
            String biography = scanner.nextLine();
            if (!biography.isEmpty()) {
                author.setBiography(biography);
            }

            authorService.updateAuthor(author);
            System.out.println("Author updated successfully!");
        } else {
            System.out.println("Author not found!");
        }
    }

    private static void deleteAuthor(AuthorService authorService) {
        System.out.print("Enter author ID to delete: ");
        int authorId = scanner.nextInt();
        scanner.nextLine();  // Consume newline

        authorService.deleteAuthor(authorId);
        System.out.println("Author deleted successfully!");
    }

    private static void viewAllAuthors(AuthorService authorService) {
        List<Author> authors = authorService.getAllAuthors();
        if (authors.isEmpty()) {
            System.out.println("No authors available.");
        } else {
            authors.forEach(author -> {
                System.out.println("ID: " + author.getAuthorId());
                System.out.println("Name: " + author.getName());
                System.out.println("Biography: " + author.getBiography());
                System.out.println("----------------------------");
            });
        }
    }
}
