import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import { BookrentalrequestService } from 'src/app/services/bookrentalrequest.service';


@Component({
  selector: 'app-userviewbooks',
  templateUrl: './userviewbooks.component.html',
  styleUrls: ['./userviewbooks.component.css']
})
export class UserviewbooksComponent implements OnInit {

  availableBooks: Book[] = [];
  filteredBooks: Book[] = [];
  rentedBooks: any[] = [];
  searchField: string = '';

  constructor(
    private router: Router,
    private bookService: BookService,
    private rentalRequestService: BookrentalrequestService
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    const userId = localStorage.getItem('userId');
    forkJoin({
      rentedBooks: this.rentalRequestService.getBookRentalRequestsByUserId(Number(userId)),
      allBooks: this.bookService.getAllBooks()
    }).subscribe(
      ({ rentedBooks, allBooks }) => {
        this.rentedBooks = rentedBooks;
        this.availableBooks = allBooks;
        this.filteredBooks = this.availableBooks;
        console.log('Rented books:', this.rentedBooks);
        console.log('Available books:', this.availableBooks);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  handleSearchChange(searchValue: string): void {
    this.searchField = searchValue;
    this.filteredBooks = this.filterBooks(searchValue);
  }

  filterBooks(search: string): Book[] {
    const searchLower = search.toLowerCase();
    return this.availableBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(searchLower) ||
        book.author.toLowerCase().includes(searchLower) ||
        book.genre.toLowerCase().includes(searchLower)
    );
  }

  handleRentClick(book: Book) {
    const isBookRented = this.isBookRented(book);
    if (isBookRented) {
      alert('You have already rented this book.');
    } else {
      localStorage.setItem('bookId', book.bookId!.toString());
      this.router.navigate(['/user/add/rental']);
    }
  }

  isBookRented(book: Book): boolean {
    return this.rentedBooks.some(
      (rental) => rental.book.bookId === book.bookId
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}