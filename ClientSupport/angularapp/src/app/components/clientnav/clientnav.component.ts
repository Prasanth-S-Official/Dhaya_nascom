import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientnav',
  templateUrl: './clientnav.component.html',
  styleUrls: ['./clientnav.component.css']
})
export class ClientnavComponent implements OnInit {

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
