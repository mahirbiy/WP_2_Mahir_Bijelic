import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popis-kurseva',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popis-kurseva.html',
  styleUrl: './popis-kurseva.css'
})
export class PopisKurseva {
  kursevi = [
    { naziv: 'Web Programiranje', ects: 6, opis: 'Osnove HTML, CSS i JavaScript-a.', ikona: '🌐' },
    { naziv: 'Baze Podataka', ects: 5, opis: 'Dizajniranje SQL baza i upravljanje podacima.', ikona: '💾' },
    { naziv: 'Objektno Programiranje', ects: 6, opis: 'Napredno programiranje koristeći C++ ili Java.', ikona: '🧩' },
    { naziv: 'Web Dizajn', ects: 4, opis: 'UI/UX dizajn i rad u Figmi.', ikona: '🎨' },
    { naziv: 'Računarske Mreže', ects: 5, opis: 'Konfiguracija i sigurnost mrežnih sistema.', ikona: '📡' },
    { naziv: 'Programiranje u Javi', ects: 6, opis: 'Razvoj aplikacija za Android i iOS.', ikona: '📱' }
  ];
}