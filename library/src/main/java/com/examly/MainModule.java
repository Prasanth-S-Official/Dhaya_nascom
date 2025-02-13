package com.examly;

import com.examly.entity.Book;
import com.examly.entity.Member;
import com.examly.entity.Transaction;
import com.examly.entity.Author;
import com.examly.service.BookService;
import com.examly.service.MemberService;
import com.examly.service.TransactionService;
import com.examly.service.AuthorService;
import com.examly.service.BookServiceImpl;
import com.examly.service.MemberServiceImpl;
import com.examly.service.TransactionServiceImpl;
import com.examly.service.AuthorServiceImpl;
import java.util.List;
import java.util.Scanner;

public class MainModule {
    private static final Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        BookService bookService = new BookServiceImpl();
        MemberService memberService = new MemberServiceImpl();
        TransactionService transactionService = new TransactionServiceImpl();
        AuthorService authorService = new AuthorServiceImpl();

        while (true) {
            System.out.println("Library Management System");
            System.out.println("1. Manage Books");
            System.out.println("2. Manage Members");
            System.out.println("3. Manage Transactions");
            System.out.println("4. Manage Authors");
            System.out.println("5. Exit");
            System.out.print("Enter your choice: ");
            int choice = scanner.nextInt();
            scanner.nextLine();  // Consume newline

            switch (choice) {
                case 1:
                    manageBooks(bookService);
                    break;
                case 2:
                    manageMembers(memberService);
                    break;
                case 3:
                    manageTransactions(transactionService);
                    break;
                case 4:
                    manageAuthors(authorService);
                    break;
                case 5:
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

    private static void manageMembers(MemberService memberService) {
        while (true) {
            System.out.println("\nManage Members");
            System.out.println("1. Add Member");
            System.out.println("2. Update Member");
            System.out.println("3. Delete Member");
            System.out.println("4. View All Members");
            System.out.println("5. Back");
            System.out.print("Enter your choice: ");
            int choice = scanner.nextInt();
            scanner.nextLine();  // Consume newline

            switch (choice) {
                case 1:
                    addMember(memberService);
                    break;
                case 2:
                    updateMember(memberService);
                    break;
                case 3:
                    deleteMember(memberService);
                    break;
                case 4:
                    viewAllMembers(memberService);
                    break;
                case 5:
                    return;
                default:
                    System.out.println("Invalid choice! Please try again.");
            }
        }
    }

    private static void manageTransactions(TransactionService transactionService) {
        while (true) {
            System.out.println("\nManage Transactions");
            System.out.println("1. Issue Book");
            System.out.println("2. Return Book");
            System.out.println("3. View All Transactions");
            System.out.println("4. Back");
            System.out.print("Enter your choice: ");
            int choice = scanner.nextInt();
            scanner.nextLine();  // Consume newline

            switch (choice) {
                case 1:
                    issueBook(transactionService);
                    break;
                case 2:
                    returnBook(transactionService);
                    break;
                case 3:
                    viewAllTransactions(transactionService);
                    break;
                case 4:
                    return;
                default:
                    System.out.println("Invalid choice! Please try again.");
            }
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

    private static void addBook(BookService bookService) {
        System.out.print("Enter book title: ");
        String title = scanner.nextLine();
        System.out.print("Enter author name: ");
        String author = scanner.nextLine();
        System.out.print("Enter published date (YYYY-MM-DD): ");
        String publishedDate = scanner.nextLine();
        System.out.print("Enter book price: ");
        double price = scanner.nextDouble();
        scanner.nextLine();  // Consume newline
    
        // Create a new Book object and set its properties
        Book book = new Book();
        book.setTitle(title);
        book.setAuthor(author);
        book.setPublishedDate(publishedDate);
        book.setPrice(price);
    
        // Call the addBook method on the service
        bookService.addBook(book);
    
        System.out.println("Book added successfully!");
    }
    

    private static void updateBook(BookService bookService) {
        System.out.print("Enter book ID to update: ");
        int bookId = scanner.nextInt();
        scanner.nextLine();  // Consume newline

        Book book = bookService.getBookById(bookId);
        if (book != null) {
            System.out.print("Enter new title (or press Enter to skip): ");
            String title = scanner.nextLine();
            if (!title.isEmpty()) {
                book.setTitle(title);
            }

            System.out.print("Enter new author (or press Enter to skip): ");
            String author = scanner.nextLine();
            if (!author.isEmpty()) {
                book.setAuthor(author);
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

            bookService.updateBook(book);
            System.out.println("Book updated successfully!");
        } else {
            System.out.println("Book not found!");
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
                System.out.println("Author: " + book.getAuthor());
                System.out.println("Published Date: " + book.getPublishedDate());
                System.out.println("Price: " + book.getPrice());
                System.out.println("----------------------------");
            });
        }
    }

    private static void addMember(MemberService memberService) {
        System.out.print("Enter member name: ");
        String name = scanner.nextLine();
        System.out.print("Enter email: ");
        String email = scanner.nextLine();
        System.out.print("Enter phone number: ");
        String phoneNumber = scanner.nextLine();

        Member member = new Member(0, name, email, phoneNumber);
        memberService.addMember(member);
        System.out.println("Member added successfully!");
    }

    private static void updateMember(MemberService memberService) {
        System.out.print("Enter member ID to update: ");
        int memberId = scanner.nextInt();
        scanner.nextLine();  // Consume newline

        Member member = memberService.getMemberById(memberId);
        if (member != null) {
            System.out.print("Enter new name (or press Enter to skip): ");
            String name = scanner.nextLine();
            if (!name.isEmpty()) {
                member.setName(name);
            }

            System.out.print("Enter new email (or press Enter to skip): ");
            String email = scanner.nextLine();
            if (!email.isEmpty()) {
                member.setEmail(email);
            }

            System.out.print("Enter new phone number (or press Enter to skip): ");
            String phoneNumber = scanner.nextLine();
            if (!phoneNumber.isEmpty()) {
                member.setPhoneNumber(phoneNumber);
            }

            memberService.updateMember(member);
            System.out.println("Member updated successfully!");
        } else {
            System.out.println("Member not found!");
        }
    }

    private static void deleteMember(MemberService memberService) {
        System.out.print("Enter member ID to delete: ");
        int memberId = scanner.nextInt();
        scanner.nextLine();  // Consume newline

        memberService.deleteMember(memberId);
        System.out.println("Member deleted successfully!");
    }

    private static void viewAllMembers(MemberService memberService) {
        List<Member> members = memberService.getAllMembers();
        if (members.isEmpty()) {
            System.out.println("No members available.");
        } else {
            members.forEach(member -> {
                System.out.println("ID: " + member.getMemberId());
                System.out.println("Name: " + member.getName());
                System.out.println("Email: " + member.getEmail());
                System.out.println("Phone Number: " + member.getPhoneNumber());
                System.out.println("----------------------------");
            });
        }
    }

    private static void issueBook(TransactionService transactionService) {
        System.out.print("Enter member ID: ");
        int memberId = scanner.nextInt();
        System.out.print("Enter book ID: ");
        int bookId = scanner.nextInt();
        scanner.nextLine();  // Consume newline

        Transaction transaction = new Transaction();
        transactionService.issueBook(transaction);
        System.out.println("Book issued successfully!");
    }

    private static void returnBook(TransactionService transactionService) {
        System.out.print("Enter transaction ID to return: ");
        int transactionId = scanner.nextInt();
        scanner.nextLine();  // Consume newline

        transactionService.returnBook(transactionId);
        System.out.println("Book returned successfully!");
    }

    private static void viewAllTransactions(TransactionService transactionService) {
        List<Transaction> transactions = transactionService.getAllTransactions();
        if (transactions.isEmpty()) {
            System.out.println("No transactions available.");
        } else {
            transactions.forEach(transaction -> {
                System.out.println("Transaction ID: " + transaction.getTransactionId());
                System.out.println("Issue Date: " + transaction.getIssueDate());
                System.out.println("Return Date: " + transaction.getReturnDate());
                System.out.println("----------------------------");
            });
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
