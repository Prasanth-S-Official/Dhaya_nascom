import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  productForm: FormGroup;
  successPopup = false;
  errorMessage = "";
  imageError = "";
  coverImageBase64: string = "";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productService: ProductService
  ) {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0.01)]],
      stockQuantity: [0, [Validators.required, Validators.min(1)]],
      category: ['', Validators.required],
      brand: ['', Validators.required],
      coverImage: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.productForm.valid && this.coverImageBase64) {
      const formData = this.productForm.value;

      const product: Product = {
        productName: formData.productName,
        description: formData.description,
        price: formData.price,
        stockQuantity: formData.stockQuantity,
        category: formData.category,
        brand: formData.brand,
        coverImage: this.coverImageBase64,
      };

      this.productService.addProduct(product).subscribe(
        (response) => {
          console.log('Product added:', response);
          this.successPopup = true;
        },
        (error) => {
          console.error('Error adding product:', error);
          this.errorMessage = 'Error adding product. Please try again.';
        }
      );
    } else {
      this.errorMessage = "All fields are required";
      if (!this.coverImageBase64) {
        this.imageError = "Cover Image is required";
      }
    }
  }

  handleFileChange(event: any): void {
    const file = event.target.files[0];

    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        this.imageError = "Invalid file type. Only JPG and PNG are allowed.";
        this.coverImageBase64 = "";
        return;
      }

      // Validate file size (optional)
      const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSizeInBytes) {
        this.imageError = "File size exceeds the maximum limit of 5MB.";
        this.coverImageBase64 = "";
        return;
      }

      this.convertFileToBase64(file).then(
        (base64String) => {
          this.coverImageBase64 = base64String;
          this.productForm.patchValue({
            coverImage: base64String,
          });
          this.imageError = "";
        },
        (error) => {
          console.error('Error converting file to base64:', error);
          this.imageError = "Error processing the image.";
        }
      );
    }
  }

  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        // Remove the "data:image/*;base64," prefix if necessary
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  handleSuccessMessage(): void {
    this.successPopup = false;
    this.errorMessage = '';
    this.imageError = '';
    this.coverImageBase64 = '';
    this.productForm.reset();
    this.router.navigate(['/admin/products']); // Navigate to product list or desired route
  }

  navigateBack(): void {
    this.router.navigate(['/admin/products']); // Adjust the route as needed
  }
}
