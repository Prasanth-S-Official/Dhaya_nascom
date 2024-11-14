import { Component, OnInit } from '@angular/core';
import { Review } from 'src/app/models/review.model';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-adminviewreviews',
  templateUrl: './adminviewreviews.component.html',
  styleUrls: ['./adminviewreviews.component.css']
})
export class AdminviewreviewsComponent implements OnInit {
  reviews: Review[] = [];
  filteredReviews: Review[] = [];
  paginatedReviews: Review[] = []; // Add this line
  selectedReview: Review | null = null;
  selectedUser: any;
  selectedProduct: any;
  searchQuery: string = '';
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;
  showProductModal = false;
  showProfileModal = false;

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.fetchReviews();
  }

  fetchReviews(): void {
    this.reviewService.getAllReviews().subscribe(
      (reviews) => {
        this.reviews = reviews;
        this.filteredReviews = reviews;
        this.updatePagination();
      },
      (error) => console.error('Error fetching reviews:', error)
    );
  }

  applyFilters(): void {
    this.filteredReviews = this.reviews.filter((review) =>
      review.product.productName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      review.user.username.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.currentPage = 1; // Reset to first page after filtering
    this.updatePagination();
  }

  sortReviews(order: string): void {
    this.filteredReviews.sort((a, b) =>
      order === 'asc'
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    this.currentPage = 1; // Reset to first page after sorting
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredReviews.length / this.pageSize);
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = this.currentPage * this.pageSize;
    this.paginatedReviews = this.filteredReviews.slice(startIndex, endIndex);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  openProductModal(review: Review): void {
    this.selectedProduct = review.product;
    this.showProductModal = true;
  }

  closeProductModal(): void {
    this.showProductModal = false;
  }

  openProfileModal(review: Review): void {
    this.selectedUser = review.user;
    this.showProfileModal = true;
  }

  closeProfileModal(): void {
    this.showProfileModal = false;
  }
}