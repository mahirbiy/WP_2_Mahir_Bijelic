import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-o-kursevima',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './o-kursevima.html',
  styleUrl: './o-kursevima.css'
})
export class OKursevima {
  naslov = 'IPI Akademija: Put do IT Karijere';
  podnaslov = 'Naši kursevi su dizajnirani da vas od nule pretvore u profesionalca.';
  
  prednosti = [
    { ikona: '🚀', tekst: 'Najmodernije tehnologije' },
    { ikona: '👨‍🏫', tekst: 'Iskusni predavači' },
    { ikona: '💼', tekst: 'Pomoć pri zapošljavanju' }
  ];
}