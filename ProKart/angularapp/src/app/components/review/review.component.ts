import { Component, OnInit } from '@angular/core';
import { ReviewService } from 'src/app/services/review.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Review } from 'src/app/models/review.model';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  reviewText: string = '';
  rating: number = 0;
  productId: number;
  userId: number;

  constructor(
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Assume userId is stored in localStorage, modify if you have a different user management system
    this.userId = parseInt(localStorage.getItem('userId') || '0');
    this.productId = this.route.snapshot.params['productId']; // Get productId from route
  }

  ngOnInit(): void {}

  setRating(star: number): void {
    this.rating = star; // Sets the rating based on selected star
  }

  submitReview(): void {
    const reviewPayload: Review = {
      reviewText: this.reviewText,
      rating: this.rating,
      date: new Date().toISOString().split('T')[0],
      user: { userId: this.userId },
      product: { productId: this.productId }
    };

    this.reviewService.addReview(reviewPayload).subscribe(
      (response) => {
        alert('Review submitted successfully!');
        this.router.navigate(['/product', this.productId]); // Redirect to the product page
      },
      (error) => {
        alert('Error submitting review. Please try again.');
      }
    );
  }
}
