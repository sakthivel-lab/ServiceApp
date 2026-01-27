import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
login() {
  // TEMP mock login
  console.log('ss');
  localStorage.setItem('token', 'demo-token');
  this.router.navigate(['/dashboard']);
}
logout() {
  localStorage.removeItem('token');
  this.router.navigate(['/login']);
}
}
