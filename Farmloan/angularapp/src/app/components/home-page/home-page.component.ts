import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  userRole: string | null = '';

  ngOnInit(): void {
    console.log("hello");
    const role = localStorage.getItem('userRole');
    console.log("role",role);
    this.userRole = role;
  }
}
