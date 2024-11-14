import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-adminviewproduct',
  templateUrl: './adminviewproduct.component.html',
  styleUrls: ['./adminviewproduct.component.css']
})
export class AdminviewproductComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchField: string = '';
  showDeletePopup: boolean = false;
  productToDelete: number | null = null;
  categories: string[] = ['Electronics', 'Home Appliances', 'Books', 'Fashion', 'Toys', 'Furniture', 'Beauty']; // Example categories
  selectedCategory: string = '';
  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getAllProducts().subscribe(
      (data: Product[]) => {
        console.log("getProducts",data);
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
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredProducts = this.products.filter(
      (product) =>
        (this.selectedCategory === '' || product.category === this.selectedCategory) &&
        (product.productName.toLowerCase().includes(this.searchField.toLowerCase()) ||
          product.description.toLowerCase().includes(this.searchField.toLowerCase()))
    );
  }

  filterByCategory(): void {
    this.applyFilters();
  }

  extractCategories(): void {
    this.categories = [...new Set(this.products.map(product => product.category))];
  }

  navigateToEditProduct(productId: number): void {
    console.log("Navigate to edit",productId);
    this.router.navigate(['/admin/newproduct', productId]);
  }

  handleDeleteClick(productId: number): void {
    this.productToDelete = productId;
    this.showDeletePopup = true;
  }

  handleConfirmDelete(): void {
    if (this.productToDelete !== null) {
      this.productService.deleteProduct(this.productToDelete).subscribe(
        () => {
          this.fetchProducts(); // Refresh the list after delete
          this.closeDeletePopup();
        },
        (error) => {
          console.error('Error deleting product:', error);
        }
      );
    }
  }

  closeDeletePopup(): void {
    this.productToDelete = null;
    this.showDeletePopup = false;
  }
}
