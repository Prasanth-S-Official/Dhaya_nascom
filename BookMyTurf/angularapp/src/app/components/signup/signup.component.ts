// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from 'src/app/services/auth.service';
// import { User } from 'src/app/models/user.model';

// @Component({
//   selector: 'app-signup',
//   templateUrl: './signup.component.html',
//   styleUrls: ['./signup.component.css']
// })
// export class SignupComponent {
//   error: string = "";
//   successPopup: boolean = false;

//   formData: User = {
//     userId: undefined,  // userId is optional during registration
//     email: '',
//     password: '',
//     username: '',
//     mobileNumber: '',
//     userRole: ''
//   };

//   confirmPassword: string = ''; // Separate confirmPassword field
//   errors: { [key: string]: string } = {};

//   constructor(private authService: AuthService, private router: Router) {}

//   validateField(fieldName: string, value: string) {
//     const fieldErrors = { ...this.errors };

//     switch (fieldName) {
//       case 'username':
//         fieldErrors.username = value.trim() === '' ? 'Username is required' : '';
//         break;
//       case 'email':
//         fieldErrors.email = value.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
//           ? '' : 'Please enter a valid email';
//         break;
//       case 'mobileNumber':
//         fieldErrors.mobileNumber = value.match(/^[0-9]{10}$/) ? '' : 'Mobile number must be 10 digits';
//         break;
//       case 'password':
//         fieldErrors.password = value.length >= 6 ? '' : 'Password must be at least 6 characters';
//         break;
//       case 'confirmPassword':
//         fieldErrors.confirmPassword = value === this.formData.password ? '' : 'Passwords do not match';
//         break;
//       case 'userRole':
//         fieldErrors.userRole = value.trim() === '' ? 'Role is required' : '';
//         break;
//       default:
//         break;
//     }

//     this.errors = fieldErrors;
//   }

//   async handleSubmit() {
//     const requiredFields = ['username', 'email', 'mobileNumber', 'password', 'userRole'];
  
//     // Check required fields in formData
//     requiredFields.forEach(field => {
//       if (!this.formData[field] || this.formData[field].trim() === '') {
//         this.errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
//       } else {
//         this.errors[field] = '';
//       }
//     });
  
//     // Validate confirmPassword separately
//     if (!this.confirmPassword.trim()) {
//       this.errors.confirmPassword = 'Confirm Password is required';
//     } else if (this.confirmPassword !== this.formData.password) {
//       this.errors.confirmPassword = 'Passwords do not match';
//     } else {
//       this.errors.confirmPassword = '';
//     }
  
//     // Check if any errors exist before submitting
//     const hasErrors = Object.values(this.errors).some(error => error !== '');
//     if (!hasErrors) {
//       try {
//         const response = await this.authService.register(this.formData).toPromise();
  
//         if (response.status === 409) {
//           this.error = response.body?.message || "User already exists with this email";
//         } else if (response.status === 200 || response.status === 201) {
//           this.successPopup = true;
//         } else {
//           this.error = "Something went wrong, please try again.";
//         }
//       } catch (error: any) {
//         console.log('Error Object:', error); 
//         if (error.status === 409) {
//           this.error = error.error || "User already exists with this email";
//         } else {
//           this.error = "Something went wrong, please try againsssss.";
//         }
//       }
//     }
//   }
  


//   handleSuccessMessage() {
//     this.successPopup = false;
//     this.router.navigate(['/login']);
//   }
// }



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

  formData: User = {
    userId: undefined,  // userId is optional during registration
    email: '',
    password: '',
    username: '',
    mobileNumber: '',
    userRole: ''
  };

  confirmPassword: string = ''; // Separate confirmPassword field
  errors: { [key: string]: string } = {};

  constructor(private authService: AuthService, private router: Router) {}

  validateField(fieldName: string, value: string) {
    const fieldErrors = { ...this.errors };

    switch (fieldName) {
      case 'username':
        fieldErrors.username = value.trim() === '' ? 'Username is required' : '';
        break;
      case 'email':
        fieldErrors.email = value.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
          ? '' : 'Please enter a valid email address';
        break;
      case 'mobileNumber':
        fieldErrors.mobileNumber = value.trim() === '' 
          ? 'Mobile number is required' 
          : value.match(/^[0-9]{10}$/) 
            ? '' 
            : 'Mobile number must be 10 digits';
        break;
      case 'password':
        fieldErrors.password = value.trim() === ''
          ? 'Password is required'
          : value.length >= 6
            ? ''
            : 'Password must be at least 6 characters long';
        break;
      case 'confirmPassword':
        fieldErrors.confirmPassword = value.trim() === ''
          ? 'Confirm password is required'
          : value === this.formData.password
            ? ''
            : 'Passwords do not match';
        break;
      case 'userRole':
        fieldErrors.userRole = value.trim() === '' ? 'User role is required' : '';
        break;
      default:
        break;
    }

    this.errors = fieldErrors;
  }

  async handleSubmit() {
    const requiredFields = ['username', 'email', 'mobileNumber', 'password', 'userRole'];

    // Check required fields in formData
    requiredFields.forEach(field => {
      if (!this.formData[field] || this.formData[field].trim() === '') {
        if (field === 'mobileNumber') {
          this.errors[field] = 'Mobile number is required';
        } else if (field === 'userRole') {
          this.errors[field] = 'User role is required';
        } else {
          this.errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
        }
      } else {
        this.errors[field] = '';
      }
    });

    // Validate confirmPassword separately
    if (!this.confirmPassword.trim()) {
      this.errors.confirmPassword = 'Confirm password is required';
    } else if (this.confirmPassword !== this.formData.password) {
      this.errors.confirmPassword = 'Passwords do not match';
    } else {
      this.errors.confirmPassword = '';
    }

    // Check if any errors exist before submitting
    const hasErrors = Object.values(this.errors).some(error => error !== '');
    if (!hasErrors) {
      try {
        const response = await this.authService.register(this.formData).toPromise();

        if (response.status === 409) {
          this.error = response.body?.message || "A user with this email already exists";
        } else if (response.status === 200 || response.status === 201) {
          this.successPopup = true;
        } else {
          this.error = "Something went wrong, please try again.";
        }
      } catch (error: any) {
        console.log('Error Object:', error); 
        if (error.status === 409) {
          this.error = error.error || "A user with this email already exists";
        } else {
          this.error = "Something went wrong, please try again.";
        }
      }
    }
  }

  handleSuccessMessage() {
    this.successPopup = false;
    this.router.navigate(['/login']);
  }
}
