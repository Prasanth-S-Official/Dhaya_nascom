import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  error: string = "";
  successPopup: boolean = false;

  formData: any ={
    userName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    role: ''
  };

  errors: any = {};

  constructor(private authService: AuthService, private router: Router) {}

  handleChange(event: any) {
    const { name, value } = event.target;
    this.formData[name] = value;
    this.validateField(name, value);
  }

  validateField(fieldName: string, value: string) {
    const fieldErrors = { ...this.errors };

    switch (fieldName) {
      case 'email':
        fieldErrors.email = value.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
          ? '' : 'Please enter a valid email';
        break;
      case 'mobile':
        fieldErrors.mobile = value.match(/^[0-9]{10}$/) ? '' : 'Mobile number must be 10 digits';
        break;
      case 'password':
        fieldErrors.password = value.length >= 6 ? '' : 'Password must be at least 6 characters';
        break;
      case 'confirmPassword':
        fieldErrors.confirmPassword =
          value === this.formData.password ? '' : 'Passwords do not match';
        break;
      default:
        break;
    }

    this.errors = fieldErrors;
  }

  async handleSubmit() {
    const fieldErrors = { ...this.errors };

    if (this.formData.userName.trim() === '') {
      fieldErrors.userName = 'User Name is required';
    } else {
      fieldErrors.userName = '';
    }
    if (this.formData.email.trim() === '') {
      fieldErrors.email = 'Email is required';
    } else {
      fieldErrors.email = '';
    }
    if (this.formData.mobile.trim() === '') {
      fieldErrors.mobile = 'Mobile Number is required';
    } else {
      fieldErrors.mobile = '';
    }
    if (this.formData.password === '') {
      fieldErrors.password = 'Password is required';
    } else if (fieldErrors.password.trim() !== '') {
      fieldErrors.password = fieldErrors.password;
    } else {
      fieldErrors.password = '';
    }
    if (this.formData.confirmPassword === '') {
      fieldErrors.confirmPassword = 'Confirm Password is required';
    } else if (this.formData.confirmPassword !== this.formData.password) {
      fieldErrors.confirmPassword = 'Passwords do not match';
    } else {
      fieldErrors.confirmPassword = '';
    }

    this.errors = fieldErrors;

    const hasErrors = Object.values(fieldErrors).some((error) => error !== '');
    if (!hasErrors) {
      let requestObject = {
        userName: this.formData.userName,
        email: this.formData.email,
        mobile: this.formData.mobile,
        password: this.formData.password,
        role: this.formData.role
      };

      try {
        const response = await this.authService.register(requestObject).toPromise();

        if (response) {
          this.successPopup = true;
        } else {
          this.error = "Something went wrong, Please try with different data";
        }
      } catch (error) {
        this.error = "Something went wrong, Please try with different data";
      }
    }
  }

  handleSuccessMessage() {
    this.successPopup = false;
    this.router.navigate(['/login']);
  }
}
