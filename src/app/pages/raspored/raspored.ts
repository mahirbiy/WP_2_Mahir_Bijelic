import { Component } from '@angular/core';

@Component({
  selector: 'app-raspored',
  standalone: true,
  templateUrl: './raspored.html',
  styleUrl: './raspored.css'      
})
export class Raspored {
  dani = ['Ponedjeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak'];
  
  predavanja = [
    { vrijeme: '09:00', predmet: 'Web Programiranje', sala: 'Amfiteatar' },
    { vrijeme: '11:00', predmet: 'Baze Podataka', sala: 'RC1' }
  ];
}