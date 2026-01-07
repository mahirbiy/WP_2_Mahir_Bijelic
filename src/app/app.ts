import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html'
})
export class AppComponent implements OnInit {
  
  ngOnInit() {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      const user = JSON.parse(userJson);
      const sacuvanaTema = localStorage.getItem(`userTheme_${user.username}`) || 'plava';
      document.documentElement.setAttribute('data-theme', sacuvanaTema);
    }
  }
}