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
  availableBooks: Book[] = [];
  allBooks: Book[] = [];
  uniqueGenres: string[] = [];
  showDeletePopup = false;
  bookToDelete: number | null = null;
  searchField = '';
  selectedGenre: string | null = null;
  status: string = '';
  errorMessage: string = '';
  showImagePopup = false;
  selectedCoverImage: string | null = null;

  constructor(private router: Router, private bookService: BookService) {}

  ngOnInit(): void {
    this.fetchAvailableBooks();
  }

  fetchAvailableBooks(): void {
    this.status = 'loading';
    this.bookService.getAllBooks().subscribe(
      (data: Book[]) => {
        this.availableBooks = data;
        this.allBooks = data;
        this.uniqueGenres = [...new Set(data.map(book => book.genre))];
        this.status = this.availableBooks.length === 0 ? 'noRecords' : '';
      },
      (error) => {
        console.error('Error fetching books:', error);
        this.status = 'error';
      }
    );
  }

  handleDeleteClick(bookId: number): void {
    this.bookToDelete = bookId;
    this.showDeletePopup = true;
  }

  navigateToEditBook(id: number): void {
    this.router.navigate(['/admin/edit/book', id]);
  }

  handleConfirmDelete(): void {
    if (this.bookToDelete) {
      this.bookService.deleteBook(this.bookToDelete.toString()).subscribe(
        () => {
          this.closeDeletePopup();
          this.fetchAvailableBooks();
          this.errorMessage = '';
        },
        (error) => {
          console.error('Error deleting book:', error);
          this.errorMessage = error.error.message || 'Error deleting book';
        }
      );
    }
  }

  closeDeletePopup(): void {
    this.bookToDelete = null;
    this.showDeletePopup = false;
    this.errorMessage = '';
  }

  applyFilters(): void {
    this.availableBooks = this.allBooks.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(this.searchField.toLowerCase());
      const matchesGenre = !this.selectedGenre || book.genre === this.selectedGenre;

      return matchesSearch && matchesGenre;
    });

    this.status = this.availableBooks.length === 0 ? 'noRecords' : '';
  }

  toggleAvailability(book: Book): void {
    const updatedBook = { ...book, isAvailable: !book.isAvailable };
    this.bookService.updateBook(book.bookId!, updatedBook).subscribe(
      () => {
        this.fetchAvailableBooks();
      },
      (error) => {
        console.error('Error updating book availability:', error);
      }
    );
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
