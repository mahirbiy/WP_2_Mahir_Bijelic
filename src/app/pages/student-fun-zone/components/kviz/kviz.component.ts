import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-kviz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './kviz.component.html',
  styleUrls: ['./kviz.component.css']
})
export class KvizComponent {
  showModal = false;
  score = 0;
  total = 5;

  
  userAnswers: any = {
    q1: '',
    q2: { a: false, b: false, c: false, d: false },
    q3: '',
    q4: { a: false, b: false, c: false, d: false },
    q5: ''
  };


  correctAnswers = {
    q1: 'a',
    q2: ['a', 'b', 'c'],
    q3: 'b',
    q4: ['a', 'b', 'd'],
    q5: 'b'
  };

  checkAnswers() {
    this.score = 0;

   
    if (this.userAnswers.q1 === this.correctAnswers.q1) this.score++;

    
    const q2Selected = Object.keys(this.userAnswers.q2).filter(key => this.userAnswers.q2[key]);
    if (JSON.stringify(q2Selected.sort()) === JSON.stringify(this.correctAnswers.q2.sort())) this.score++;

    
    if (this.userAnswers.q3 === this.correctAnswers.q3) this.score++;


    const q4Selected = Object.keys(this.userAnswers.q4).filter(key => this.userAnswers.q4[key]);
    if (JSON.stringify(q4Selected.sort()) === JSON.stringify(this.correctAnswers.q4.sort())) this.score++;

    
    if (this.userAnswers.q5 === this.correctAnswers.q5) this.score++;

    const loggedInUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (loggedInUser.email) {

      localStorage.setItem(`quiz_score_${loggedInUser.email}`, this.score.toString());
    }
  
    this.showModal = true;
  }

  resetQuiz() {
    this.userAnswers = {
      q1: '',
      q2: { a: false, b: false, c: false, d: false },
      q3: '',
      q4: { a: false, b: false, c: false, d: false },
      q5: ''
    };
    this.score = 0;
    this.showModal = false;
  }
}