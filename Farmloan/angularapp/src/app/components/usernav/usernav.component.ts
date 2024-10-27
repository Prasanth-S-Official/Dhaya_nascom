// import { Component, OnInit } from '@angular/core';
// import { AuthService } from 'src/app/services/auth.service';

// @Component({
//   selector: 'app-usernav',
//   templateUrl: './usernav.component.html',
//   styleUrls: ['./usernav.component.css']
// })
// export class UsernavComponent implements OnInit {

//   isLoggedIn: boolean = false;
//   isCustomer: boolean = false;

//   constructor(private authService: AuthService) {
//     this.authService.isAuthenticated$.subscribe((authenticated: boolean) => {
//       this.isLoggedIn = authenticated;
//       if (this.isLoggedIn) {
//         this.isCustomer = this.authService.isCustomer();
//         console.log(this.isCustomer);

//       } else {
//         this.isCustomer = false;
//       }
//     });
//   }

//   ngOnInit(): void {
//     // Initialize the properties on component initialization
//     this.isLoggedIn = this.authService.isAuthenticated();
//     if (this.isLoggedIn) {
//       this.isCustomer = this.authService.isCustomer();
//     }
//   }
// }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrls: ['./usernav.component.css']
})
export class UsernavComponent implements OnInit {
  showLogoutPopup = false;
  userName = '';
  userRole = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    const storedUserName = localStorage.getItem('username');
    const storedUserRole = localStorage.getItem('userRole');

    this.userName = storedUserName || '';
    this.userRole = storedUserRole || '';
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
