import { Component } from '@angular/core';
import { AuthService } from '../../pages/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {

  constructor(public authService: AuthService, public router: Router) {}

  idiNaDashboard() {
    this.router.navigate(['/dashboard']);
  }

  odjaviSe() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}