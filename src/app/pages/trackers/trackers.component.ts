import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-trackers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trackers.component.html',
  styleUrls: ['./trackers.component.css']
})
export class TrackersComponent implements OnInit {
  podaci: any = {
    fitness: { 
      naslov: 'Fitness Tracker', ikona: '🏃', isLocked: false, 
      aktivnost: 'Šetnja', trajanje: 0, intenzitet: 'Srednji' 
    },
    water: { 
      naslov: 'Water Tracker', ikona: '💧', isLocked: false, 
      vrijednost: 0, cilj: 8, vrstaPica: 'Voda' 
    },
    sleep: { 
      naslov: 'Sleep Tracker', ikona: '😴', isLocked: false, 
      sati: 0, kvalitet: 'Dobro', vrijemeBudjenja: '07:00' 
    },
    finance: { 
      naslov: 'Finance Tracker', ikona: '💰', isLocked: false, 
      iznos: 0, kategorija: 'Hrana', opis: '' 
    },
    mood: { 
      naslov: 'Mood Tracker', ikona: '😊', isLocked: false, 
      status: 'Neutralno', napomena: '' 
    },
    habit: { 
      naslov: 'Habit Tracker', ikona: '✅', isLocked: false, 
      nazivNavike: '', vrijeme: '08:00', kategorija: 'Zdravlje', serijaDana: 0, napomena: '' 
    }
  };

  aktivniTrackerKey: string | null = null;
  aiPoruka: string = "";
  trenutniKorisnik: string = "";
  korisnikEmail: string = "";
  procentiZavrseno: number = 0;

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.trenutniKorisnik = user.username || 'Gost';
    this.korisnikEmail = user.email || 'guest';
    
    const storageKey = `trackers_final_solid_${this.korisnikEmail}`;
    const sacuvano = localStorage.getItem(storageKey);
    if (sacuvano) {
      this.podaci = JSON.parse(sacuvano);
    }
    this.izracunajNapredak();
    this.generisiAIUvide();
  }

  izracunajNapredak() {
    const total = Object.keys(this.podaci).length;
    const locked = Object.keys(this.podaci).filter(k => this.podaci[k].isLocked).length;
    this.procentiZavrseno = Math.round((locked / total) * 100);
  }

  otvoriProzor(key: string) { this.aktivniTrackerKey = key; }
  zatvoriProzor() { this.aktivniTrackerKey = null; }

  sacuvaj() {
    if (this.aktivniTrackerKey) {
      if (this.aktivniTrackerKey === 'habit' && !this.podaci.habit.isLocked) {
        this.podaci.habit.serijaDana += 1;
      }
      this.podaci[this.aktivniTrackerKey].isLocked = true;
      localStorage.setItem(`trackers_final_solid_${this.korisnikEmail}`, JSON.stringify(this.podaci));
      this.izracunajNapredak();
      this.generisiAIUvide();
      this.zatvoriProzor();
    }
  }

  otkljucaj() {
    if (this.aktivniTrackerKey) {
      this.podaci[this.aktivniTrackerKey].isLocked = false;
      localStorage.setItem(`trackers_final_solid_${this.korisnikEmail}`, JSON.stringify(this.podaci));
      this.izracunajNapredak();
    }
  }

  generisiAIUvide() {
    const s = this.podaci.sleep.sati;
    if (s > 0 && s < 6) this.aiPoruka = "Pripazi na san, " + this.trenutniKorisnik + ". Treba ti odmor.";
    else if (s >= 7) this.aiPoruka = "Odličan balans sna i aktivnosti!";
    else this.aiPoruka = "Unesi današnje podatke za analizu.";
  }
}