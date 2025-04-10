import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/product.model';
import { Router } from '@angular/router'; // Import Router
import { Review } from 'src/app/models/review.model';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-userviewproduct',
  templateUrl: './userviewproduct.component.html',
  styleUrls: ['./userviewproduct.component.css']
})
export class UserviewproductComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchField: string = '';
  quantities: { [productId: number]: number } = {}; // Store quantity for each product
  reviews: Review[] = [];
  showReviewModal: boolean = false;
  selectedProduct: Product | null = null;

  constructor(
    private productService: ProductService, 
    private cartService: CartService,
    private snackBar: MatSnackBar,
    private router: Router,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getAllProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
        this.filteredProducts = this.products;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  handleSearchChange(searchValue: string): void {
    this.searchField = searchValue;
    this.filteredProducts = this.filterProducts(searchValue);
  }

  filterProducts(search: string): Product[] {
    const searchLower = search.toLowerCase();
    return this.products.filter(
      (product) =>
        product.productName.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
    );
  }

  addToCart(product: Product): void {
    const quantity = this.quantities[product.productId] || 1; // Default to 1 if not specified
    if (quantity > product.stockQuantity) {
      this.snackBar.open(`Only ${product.stockQuantity} items are available for ${product.productName}.`, 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }
  
    this.cartService.addToCart(product, quantity);
    this.showAddToCartMessage(product.productName);
  
    // Clear the selected quantity after adding to cart
    this.quantities[product.productId] = null;
  }
  

  showAddToCartMessage(productName: string): void {
    this.snackBar.open(`✔️ ${productName} added to cart!`, '', {
      duration: 3000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }

  generateQuantityOptions(stockQuantity: number): number[] {
    const options = [];
    for (let qty = 1; qty <= stockQuantity; qty += qty < 10 ? 1 : 10) {
      options.push(qty);
    }
    return options;
  }

  navigateToReview(product: Product): void {
    this.router.navigate(['/user/review', product.productId]); // Navigate to review with productId
  }

  showReviews(product: Product): void {
    this.selectedProduct = product;
    this.reviewService.getReviewsByProductId(product.productId).subscribe(
      (reviews) => {
        this.reviews = reviews;
        this.showReviewModal = true;
      },
      (error) => {
        console.error('Error fetching reviews:', error);
      }
    );
  }

  closeReviewModal(): void {
    this.showReviewModal = false;
    this.reviews = [];
  }
}
