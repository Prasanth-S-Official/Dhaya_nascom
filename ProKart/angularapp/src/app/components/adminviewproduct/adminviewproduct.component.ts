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

  navigateToEditProduct(productId: number): void {
    this.router.navigate(['/admin/editproduct', productId]);
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
