import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-adminviewbook',
  templateUrl: './adminviewbook.component.html',
  styleUrls: ['./adminviewbook.component.css']
})
export class AdminviewbookComponent implements OnInit {
  availableBooks: Book[] = []; // List of books to display
  allBooks: Book[] = []; // Full list of books fetched from the server
  uniqueGenres: string[] = []; // List of unique genres for filtering
  showDeletePopup = false; // Controls visibility of the delete confirmation popup
  bookToDelete: number | null = null; // ID of the book to delete
  searchField = ''; // Search input value
  selectedGenre: string | null = null; // Selected genre for filtering
  status: string = ''; // Status for loading, error, or no records
  errorMessage: string = ''; // Error message for delete operation

  // Variables for image popup
  showImagePopup = false;
  selectedCoverImage: string | null = null; // Base64 string of the selected cover image

  constructor(private router: Router, private bookService: BookService) {}

  ngOnInit(): void {
    this.fetchAvailableBooks(); // Fetch books on component initialization
  }

  fetchAvailableBooks(): void {
    this.status = 'loading'; // Set loading status
    this.bookService.getAllBooks().subscribe(
      (data: Book[]) => {
        this.availableBooks = data; // Set available books from response
        this.allBooks = data; // Keep a copy of all books for filtering
        this.uniqueGenres = [...new Set(data.map(book => book.genre))]; // Extract unique genres
        this.status = this.availableBooks.length === 0 ? 'noRecords' : ''; // Update status
      },
      (error) => {
        console.error('Error fetching books:', error);
        this.status = 'error'; // Set error status
      }
    );
  }

  handleDeleteClick(bookId: number): void {
    this.bookToDelete = bookId;
    this.showDeletePopup = true; // Show the delete confirmation popup
  }

  navigateToEditBook(id: number): void {
    this.router.navigate(['/admin/edit/book', id]); // Navigate to edit page
  }

  handleConfirmDelete(): void {
    if (this.bookToDelete) {
      this.bookService.deleteBook(this.bookToDelete.toString()).subscribe(
        () => {
          this.closeDeletePopup(); // Close popup after deletion
          this.fetchAvailableBooks(); // Refresh books after deletion
          this.errorMessage = ''; // Clear error messages
        },
        (error) => {
          console.error('Error deleting book:', error);
          this.errorMessage = error.error.message || 'Error deleting book'; // Set error message
        }
      );
    }
  }

  closeDeletePopup(): void {
    this.bookToDelete = null; // Reset book to delete
    this.showDeletePopup = false; // Hide the delete popup
    this.errorMessage = ''; // Clear error message
  }

  applyFilters(): void {
    this.availableBooks = this.allBooks.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(this.searchField.toLowerCase()) ||
                            book.description.toLowerCase().includes(this.searchField.toLowerCase());
      const matchesGenre = !this.selectedGenre || book.genre === this.selectedGenre;

      return matchesSearch && matchesGenre;
    });

    this.status = this.availableBooks.length === 0 ? 'noRecords' : ''; // Update status if no records found
  }

  showCoverImage(base64Image: string): void {
    this.selectedCoverImage = base64Image;
    this.showImagePopup = true;
  }

  closeImagePopup(): void {
    this.selectedCoverImage = null;
    this.showImagePopup = false;
  }
}
