import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookrentalrequestService } from 'src/app/services/bookrentalrequest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-useraddrequest',
  templateUrl: './useraddrequest.component.html',
  styleUrls: ['./useraddrequest.component.css']
})
export class UseraddrequestComponent implements OnInit {

  requestForm: FormGroup;
  successPopup = false;
  errorMessage = "";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private bookrentalrequestService: BookrentalrequestService
  ) {
    // Initialize the form group with fields
    this.requestForm = this.fb.group({
      returnDate: ['', Validators.required], // Return date is mandatory
      comments: [''],                       // Optional comments
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.requestForm.valid) {
      const formData = this.requestForm.value;

      const payload:  any = {
        requestDate: new Date().toISOString().split('T')[0], // Current date
        returnDate: formData.returnDate,
        status: 'Pending', // Default status
        comments: formData.comments,
        user: { userId: Number(localStorage.getItem('userId')) }, // User ID from local storage
        book: { bookId: Number(localStorage.getItem('bookId')) }  // Book ID from local storage
      };

      console.log("Submitting Payload:", payload);

      this.bookrentalrequestService.addBookRentalRequest(payload).subscribe(
        (response) => {
          console.log('Response:', response);
          this.successPopup = true;
        },
        (error) => {
          console.error('Error submitting request:', error);
          this.errorMessage = 'Error submitting request';
        }
      );
    } else {
      this.errorMessage = "All required fields must be filled out";
    }
  }

  handleSuccessMessage(): void {
    this.successPopup = false;
    this.router.navigate(['/user/view/books']);
  }

  navigateBack(): void {
    this.router.navigate(['/user/view/books']);
  }
}