import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { NgForm } from '@angular/forms';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-adminbook',
  templateUrl: './adminbook.component.html',
  styleUrls: ['./adminbook.component.css']
})
export class AdminbookComponent implements OnInit {

  bookForm: FormGroup;
  successPopup = false;
  errorMessage = '';
  imageError = '';
  coverImageBase64: string = '';
  id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      genre: ['', Validators.required],
      description: ['', Validators.required],
      rentalFee: ['', [Validators.required, Validators.min(0.01)]],
      isAvailable: [true, Validators.required],
      coverImage: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? Number(idParam) : null;
    if (this.id) {
      this.fetchBook(this.id);
    }
  }

  fetchBook(id: number): void {
    this.bookService.getBookById(id).subscribe(
      (response) => {
        this.bookForm.patchValue(response);
        this.coverImageBase64 = response.coverImage;
      },
      (error) => {
        this.router.navigate(['/error']);
      }
    );
  }

  onSubmit(): void {
    if (this.bookForm.valid && this.coverImageBase64) {
      const formData = this.bookForm.value;

      const book: Book = {
        title: formData.title,
        author: formData.author,
        genre: formData.genre,
        description: formData.description,
        rentalFee: formData.rentalFee,
        isAvailable: formData.isAvailable,
        coverImage: this.coverImageBase64,
      };

      if (this.id) {
        this.bookService.updateBook(this.id, book).subscribe(
          () => this.showSuccessPopup(),
          () => this.showErrorPopup('Error updating book')
        );
      } else {
        this.bookService.addBook(book).subscribe(
          () => this.showSuccessPopup(),
          () => this.showErrorPopup('Error adding book')
        );
      }
    } else {
      this.errorMessage = 'All fields are required';
      if (!this.coverImageBase64) {
        this.imageError = 'Cover Image is required';
      }
    }
  }

  handleFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        this.imageError = 'Invalid file type. Only JPG and PNG are allowed.';
        this.coverImageBase64 = '';
        return;
      }

      const maxSizeInBytes = 5 * 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        this.imageError = 'File size exceeds the maximum limit of 5MB.';
        this.coverImageBase64 = '';
        return;
      }

      this.convertFileToBase64(file).then(
        (base64String) => {
          this.coverImageBase64 = base64String;
          this.bookForm.patchValue({
            coverImage: base64String,
          });
          this.imageError = '';
        },
        (error) => {
          console.error('Error converting file to base64:', error);
          this.imageError = 'Error processing the image.';
        }
      );
    }
  }

  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  showSuccessPopup(): void {
    this.successPopup = true;
  }

  showErrorPopup(message: string): void {
    this.errorMessage = message;
  }

  handleSuccessMessage(): void {
    this.successPopup = false;
    this.errorMessage = '';
    this.imageError = '';
    this.coverImageBase64 = '';
    this.bookForm.reset();
    this.router.navigate(['/admin/view/books']);
  }

  navigateBack(): void {
    this.router.navigate(['/admin/view/books']);
  }
}