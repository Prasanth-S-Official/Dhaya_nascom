import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { Review } from 'src/app/models/review.model';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-myreview',
  templateUrl: './myreview.component.html',
  styleUrls: ['./myreview.component.css']
})
export class MyreviewComponent implements OnInit {
  reviews: Review[] = [];
  userId: number;
  showDeleteModal: boolean = false;
  showProductModal: boolean = false;
  reviewIdToDelete: number | null = null;
  selectedProduct: Product | null = null;

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.userId = parseInt(localStorage.getItem('userId') || '0', 10);
    this.loadReviews();
  }

  loadReviews(): void {
    this.reviewService.getReviewsByUserId(this.userId).subscribe(
      (data) => {
        this.reviews = data;
      },
      (error) => {
        console.error('Error fetching reviews:', error);
      }
    );
  }

  openProductModal(product: Product): void {
    this.selectedProduct = product;
    this.showProductModal = true;
  }

  closeProductModal(): void {
    this.showProductModal = false;
    this.selectedProduct = null;
  }

  confirmDelete(reviewId: number): void {
    this.reviewIdToDelete = reviewId;
    this.showDeleteModal = true;
  }

  deleteReview(): void {
    if (this.reviewIdToDelete !== null) {
      this.reviewService.deleteReview(this.reviewIdToDelete).subscribe(
        () => {
          this.reviews = this.reviews.filter(review => review.reviewId !== this.reviewIdToDelete);
          this.closeDeleteModal();
        },
        (error) => {
          console.error('Error deleting review:', error);
          this.closeDeleteModal();
        }
      );
    }
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.reviewIdToDelete = null;
  }
}