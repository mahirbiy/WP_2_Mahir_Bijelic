import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class Auth implements OnInit {
  prijavaMode = true;
  trenutniKorisnik = '';

  podaci = {
    ime: '',
    email: '',
    lozinka: ''
  };

  constructor(public authServis: AuthService, public router: Router) {}

  ngOnInit() {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      const user = JSON.parse(userJson);
      this.trenutniKorisnik = user.username;
      this.authServis.isLoggedIn = true;
      
     
      const sacuvanaTema = localStorage.getItem(`userTheme_${user.email}`) || 'plava';
      document.documentElement.setAttribute('data-theme', sacuvanaTema);
    }
  }

  promijeniMod() {
    this.prijavaMode = !this.prijavaMode;
  }

  odjaviSe() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userName');
    this.authServis.isLoggedIn = false;
    this.trenutniKorisnik = '';
    
    document.documentElement.setAttribute('data-theme', 'plava');
    this.router.navigate(['/auth']);
  }

  izvrsiAkciju() {
    this.authServis.posaljiPodatke(this.podaci.email, this.podaci.lozinka, this.prijavaMode)
      .subscribe({
        next: (odgovor: any) => {
          const email = this.podaci.email;
          const username = this.podaci.ime || email;
          const sacuvanaTema = localStorage.getItem(`userTheme_${email}`) || 'plava';

          
          localStorage.setItem('currentUser', JSON.stringify({ username, email }));
          document.documentElement.setAttribute('data-theme', sacuvanaTema);
          
          this.authServis.isLoggedIn = true;
          this.router.navigate(['/dashboard']);
        },
        error: (greska: any) => alert('Greška pri prijavi/registraciji.')
      });
  }
}