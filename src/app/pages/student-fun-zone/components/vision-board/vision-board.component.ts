import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface BoardItem {
  id: number;
  type: 'note' | 'quote' | 'image';
  text?: string;
  src?: string;
  left: number;
  top: number;
  className: string;
}

@Component({
  selector: 'app-vision-board',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vision-board.component.html',
  styleUrls: ['./vision-board.component.css']
})
export class VisionBoardComponent implements OnInit {
  items: BoardItem[] = [];
  colors = ["color1", "color2", "color3", "color4", "color5", "color6"];

  iconLibrary = [
    { url: 'https://cdn-icons-png.flaticon.com/512/201/201623.png', tip: 'Putovanje' },
    { url: 'https://cdn-icons-png.flaticon.com/512/2454/2454282.png', tip: 'Ciljevi' },
    { url: 'https://cdn-icons-png.flaticon.com/512/2871/2871210.png', tip: 'Zdravlje' },
    { url: 'https://cdn-icons-png.flaticon.com/512/606/606203.png', tip: 'Kodiranje' },
    { url: 'https://cdn-icons-png.flaticon.com/512/1150/1150612.png', tip: 'Uspjeh' }
  ];

  sampleQuotes = [
    "“Svaka dovoljno napredna tehnologija jednaka je magiji.”",
    "“Tehnologija je riječ koja opisuje nešto što još ne funkcionira.”",
    "“Fokusiraj se na cilj, a ne na prepreke.”"
  ];

  ngOnInit() {
    this.loadBoard();
  }

  addNote() {
    this.items.push({
      id: Date.now(),
      type: 'note',
      text: 'Napiši misao...',
      left: Math.random() * 400,
      top: Math.random() * 200,
      className: "note " + this.colors[Math.floor(Math.random() * this.colors.length)]
    });
  }

  addSpecificImage(url: string) {
    this.items.push({
      id: Date.now(),
      type: 'image',
      src: url,
      left: 100 + Math.random() * 200,
      top: 100 + Math.random() * 150,
      className: "pinned-img"
    });
  }

  addQuote() {
    this.items.push({
      id: Date.now(),
      type: 'quote',
      text: this.sampleQuotes[Math.floor(Math.random() * this.sampleQuotes.length)],
      left: Math.random() * 400,
      top: Math.random() * 200,
      className: "quote"
    });
  }

  removeItem(id: number) {
    this.items = this.items.filter(item => item.id !== id);
  }

  draggingItem: BoardItem | null = null;
  offset = { x: 0, y: 0 };

  onMouseDown(e: MouseEvent, item: BoardItem) {
    this.draggingItem = item;
    this.offset.x = e.clientX - item.left;
    this.offset.y = e.clientY - item.top;
  }

  onMouseMove(e: MouseEvent) {
    if (this.draggingItem) {
      this.draggingItem.left = e.clientX - this.offset.x;
      this.draggingItem.top = e.clientY - this.offset.y;
    }
  }

  onMouseUp() {
    this.draggingItem = null;
  }

  saveBoard() {
    localStorage.setItem("visionBoardItems", JSON.stringify(this.items));
    alert("Vision Board sačuvan!");
  }

  loadBoard() {
    const data = localStorage.getItem("visionBoardItems");
    if (data) this.items = JSON.parse(data);
  }

  clearBoard() {
    if (confirm("Očisti cijelu ploču?")) {
      this.items = [];
      localStorage.removeItem("visionBoardItems");
    }
  }
}