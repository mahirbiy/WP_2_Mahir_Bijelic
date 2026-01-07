import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private mojApiKey = "AIzaSyB-9NiDsPFyGIvIM1q8lFcEn66DBmOB2Jg";
  private urlRegistracija = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.mojApiKey}`;
  private urlPrijava = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.mojApiKey}`;

 
  isLoggedIn = false;

  constructor(private http: HttpClient) { }

  posaljiPodatke(email: string, lozinka: string, jeLiPrijava: boolean) {
    const podaci = {
      email: email,
      password: lozinka,
      returnSecureToken: true
    };
    const putanja = jeLiPrijava ? this.urlPrijava : this.urlRegistracija;
    return this.http.post(putanja, podaci);
  }

  logout() {
    this.isLoggedIn = false;
  }
}