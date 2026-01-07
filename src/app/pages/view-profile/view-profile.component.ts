import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  user: any = null;
  stats = {
    kanbanDone: 0,
    quizBest: 0,
    bingoFields: 0
  };

  ngOnInit() {
    const loggedIn = localStorage.getItem('currentUser');
    if (loggedIn) {
      this.user = JSON.parse(loggedIn);
      this.loadUserStats(this.user.email);
    }
  }

  loadUserStats(email: string) {
    const kanban = JSON.parse(localStorage.getItem(`kanban_${email}`) || '{"done":[]}');
    this.stats.kanbanDone = kanban.done?.length || 0;

    this.stats.quizBest = Number(localStorage.getItem(`quiz_score_${email}`)) || 0;

    const bingo = JSON.parse(localStorage.getItem(`bingo_selected_${email}`) || '[]');
    this.stats.bingoFields = bingo.flat().filter((x: boolean) => x).length;
  }
  promijeniTemu(novaTema: string) {
    document.documentElement.setAttribute('data-theme', novaTema);
  
    if (this.user && this.user.email) {
      localStorage.setItem(`userTheme_${this.user.email}`, novaTema);
    }
    
    
    console.log('Tema promijenjena u: ' + novaTema);
  }
}