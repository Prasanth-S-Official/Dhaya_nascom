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
