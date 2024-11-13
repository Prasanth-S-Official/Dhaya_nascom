import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from 'src/app/services/review.service';
import { Review } from 'src/app/models/review.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  productId: number;
  reviewText: string = '';
  rating: number = 0; // Variable to hold the selected rating
  userId: number;

  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('productId')!;
    this.userId = parseInt(localStorage.getItem('userId') || '0', 10); // Get the user ID from localStorage or set it to 0 if not available
  }

  // Function to set the rating based on the star clicked
  setRating(star: number): void {
    this.rating = star;
  }

  addReview(): void {
    const reviewPayload: Partial<Review> = {
      reviewText: this.reviewText,
      rating: this.rating,
      date: new Date().toISOString().split('T')[0], // Set date to today’s date
      user: { userId: this.userId } as any,
      product: { productId: this.productId } as any
    };

    console.log("Review",reviewPayload);
    this.reviewService.addReview(reviewPayload as Review).subscribe(
      (response) => {
        console.log("Review",response);
        this.snackBar.open('Review added successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.reviewText = '';
        this.rating = 0;
      },
      (error) => {
        console.error("Error adding review:", error);
        this.snackBar.open('Error adding review. Please try again.', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    );
  }
}
