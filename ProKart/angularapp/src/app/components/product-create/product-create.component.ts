import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
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
  id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0.01)]],
      stockQuantity: ['', [Validators.required, Validators.min(1)]],
      category: ['', Validators.required],
      brand: ['', Validators.required],
      coverImage: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? Number(idParam) : null;
    if (this.id) {
      this.fetchProduct(this.id);
    }
  }

  fetchProduct(id: number): void {
    this.productService.getProductById(id).subscribe(
      (response) => {
        this.productForm.patchValue(response);
        this.coverImageBase64 = response.coverImage;
      },
      (error) => {
        this.router.navigate(['/error']);
      }
    );
  }

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

      if (this.id) {
        this.productService.updateProduct(this.id, product).subscribe(
          () => this.showSuccessPopup(),
          () => this.showErrorPopup('Error updating product')
        );
      } else {
        this.productService.addProduct(product).subscribe(
          () => this.showSuccessPopup(),
          () => this.showErrorPopup('Error adding product')
        );
      }
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
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        this.imageError = "Invalid file type. Only JPG and PNG are allowed.";
        this.coverImageBase64 = "";
        return;
      }

      const maxSizeInBytes = 5 * 1024 * 1024;
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
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  showSuccessPopup(): void {
    this.successPopup = true;
  }

  showErrorPopup(message: string): void {
    this.errorMessage = message;
  }

  handleSuccessMessage(): void {
    this.successPopup = false;
    this.errorMessage = '';
    this.imageError = '';
    this.coverImageBase64 = '';
    this.productForm.reset();
    this.router.navigate(['/admin/products']);
  }

  navigateBack(): void {
    this.router.navigate(['/admin/products']);
  }
}
