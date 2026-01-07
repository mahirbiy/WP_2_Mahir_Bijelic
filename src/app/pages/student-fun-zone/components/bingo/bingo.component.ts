import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-bingo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bingo.component.html',
  styleUrls: ['./bingo.component.css']
})
export class BingoComponent {

  bingoRows = [
    ["Putovao je van zemlje.", "Letio je avionom.", "Ima više od troje braće i sestara.", "Ima pet ili više kućnih ljubimaca.", "Voli jesti kisele krastavce."],
    ["Igra košarku.", "Voli Disney-eve crtane filmove.", "Voli crtati.", "Voli HTML.", "Zna roniti."],
    ["Omiljena boja je narančasta.", "Ne voli plažu.", "SLOBODAN PROSTOR", "Dobar je u matematici.", "Nema kućne ljubimce."],
    ["Ne voli čokoladu.", "Boji se pauka.", "Voli peći kolačiće.", "Svira instrument.", "Alergičan je na mačke ili pse."],
    ["Slavi rođendan u oktobru.", "Voli jesti sir.", "Igra online igre.", "Ne voli pizzu.", "Voli pjevati."]
  ];

  selectedCells: boolean[][] = Array(5).fill(null).map(() => Array(5).fill(false));

  constructor() { this.selectedCells[2][2] = true; }

  toggleCell(row: number, col: number) {
    if (row === 2 && col === 2) return;
    this.selectedCells[row][col] = !this.selectedCells[row][col];
  }


  async generatePDF() {
    const data = document.getElementById('bingo-content');
    if (data) {
      const canvas = await html2canvas(data);
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 10, 208, (canvas.height * 208) / canvas.width);
      pdf.save('Bingo.pdf');
    }
  }
}