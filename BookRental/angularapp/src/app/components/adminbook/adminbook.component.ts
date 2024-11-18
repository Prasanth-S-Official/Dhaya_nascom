import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { NgForm } from '@angular/forms';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-adminbook',
  templateUrl: './adminbook.component.html',
  styleUrls: ['./adminbook.component.css']
})
export class AdminbookComponent implements OnInit {

  formData: Book = {
    title: '',
    author: '',
    genre: '',
    description: '',
    rentalFee: null,
    isAvailable: true,
    coverImage: ''
  };
  errors: any = {};
  errorMessage: string;
  successPopup: boolean = false;

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {}

  handleChange(event: any, field: string) {
    this.formData[field] = event.target.value;
  }

  handleFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.convertFileToBase64(file).then(
        (base64String) => {
          this.formData.coverImage = base64String;
        },
        (error) => {
          console.error('Error converting file to base64:', error);
        }
      );
    }
  }

  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  onSubmit(bookForm: NgForm) {
    if (bookForm.valid) {
      this.bookService.addBook(this.formData).subscribe(
        (res) => {
          this.successPopup = true;
          bookForm.resetForm();
        },
        (err) => {
          if (err.status === 500) {
            this.errorMessage = 'Book with the same title already exists';
          } else {
            this.errors = err.error;
          }
        }
      );
    } else {
      this.errorMessage = 'All fields are required';
    }
  }

  handleSuccessMessage() {
    this.successPopup = false;
    this.errorMessage = '';
    this.formData = {
      title: '',
      author: '',
      genre: '',
      description: '',
      rentalFee: null,
      isAvailable: true,
      coverImage: ''
    };
  }
}