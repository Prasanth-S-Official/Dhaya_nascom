import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myreview',
  templateUrl: './myreview.component.html',
  styleUrls: ['./myreview.component.css']
})
export class MyreviewComponent implements OnInit {

  reviews: Review[] = [];
  userId: number;
  showDeleteModal: boolean = false;
  reviewIdToDelete: number | null = null;

  constructor(private reviewService: ReviewService, private router: Router) {}

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

  viewProduct(productId: number): void {
    this.router.navigate(['/product', productId]);
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