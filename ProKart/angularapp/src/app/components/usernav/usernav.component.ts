// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-usernav',
//   templateUrl: './usernav.component.html',
//   styleUrls: ['./usernav.component.css']
// })
// export class UsernavComponent implements OnInit {
//   showLogoutPopup = false;
//   userName = '';
//   userRole = '';

//   constructor(private router: Router) { }

//   ngOnInit(): void {
//     const storedUserName = localStorage.getItem('username');
//     const storedUserRole = localStorage.getItem('userRole');

//     this.userName = storedUserName || '';
//     this.userRole = storedUserRole || '';
//   }

//   logout(): void {
//     localStorage.clear();
//     this.router.navigate(['/login']);
//   }
// }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrls: ['./usernav.component.css']
})
export class UsernavComponent implements OnInit {
  showLogoutPopup = false;
  showCartOverlay = false;
  userName = '';
  userRole = '';
  cartItemCount = 0;

  constructor(private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
    const storedUserName = localStorage.getItem('username');
    const storedUserRole = localStorage.getItem('userRole');

    this.userName = storedUserName || '';
    this.userRole = storedUserRole || '';

    // Subscribe to cart items for updates
    this.cartService.cartItems$.subscribe(cartItems => {
      this.cartItemCount = cartItems.length;
    });
  }

  toggleCartOverlay(): void {
    this.showCartOverlay = !this.showCartOverlay;
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.toggleCartOverlay(); // Optionally close the cart overlay after clearing
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
