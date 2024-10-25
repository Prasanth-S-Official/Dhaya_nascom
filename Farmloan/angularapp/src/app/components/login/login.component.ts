import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: string = "";
  formData: any = {
    email: "",
    password: ""
  };
  errors: any = {};

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    localStorage.setItem("token", "");
  }

  handleChange(event: any) {
    const { name, value } = event.target;
    this.formData[name] = value;
    this.validateField(name, value);
  }

  validateField(fieldName: string, value: string) {
    const fieldErrors = { ...this.errors };

    switch (fieldName) {
      case "email":
        fieldErrors.email = value.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
          ? ""
          : "Please enter a valid email";
        break;
      case "password":
        fieldErrors.password =
          value.length >= 6 ? "" : "Password must be at least 6 characters";
        break;
      default:
        break;
    }

    this.errors = fieldErrors;
  }

  async handleLogin() {
    this.error = "";
    console.log("Login clicked");

    const fieldErrors = { ...this.errors };

    if (
      this.formData.email.trim() === "" ||
      this.formData.password.trim() === "" ||
      fieldErrors.email.trim() !== "" ||
      fieldErrors.password.trim() !== ""
    ) {
      this.errors = {
        email: this.formData.email.trim() === "" ? "Email is required" : fieldErrors.email,
        password:
          this.formData.password.trim() === ""
            ? "Password is required"
            : fieldErrors.password,
      };
      return;
    } else {
      try {
        let requestObject = {
          email: this.formData.email,
          password: this.formData.password,
        };

        console.log("requestObject", requestObject);

        const response = await this.authService.login(requestObject).toPromise();

        console.log("response in login", response);

        if (response) {
          let userData = {
            token: response.token,
            role: response.role,
            userId: response.id,
            userName: response.userName,
            isAuthenticated: true,
          };
          console.log("userData", userData);
          this.authService.storeUserData(userData);

          if (response.role === "Admin") {
            this.router.navigate(['/home']);
          } else {
            this.router.navigate(['/home']);
          }
        } else {
          this.error = "Invalid Email or Password";
        }
      } catch (error) {
        console.log(error);
        this.error = "Invalid Email or Password";
      }
    }
  }
}
