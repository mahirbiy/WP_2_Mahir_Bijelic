import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {
  tasks: { todo: string[], progress: string[], done: string[] } = {
    todo: ['Projekt WP2', 'Zadaća iz Angulara'],
    progress: [],
    done: []
  };

  showModal = false;
  newTaskText = "";
  korisnikEmail: string = "";

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.korisnikEmail = user.email || 'guest';
    this.loadBoard();
  }


  getTasksByCol(colId: string): string[] {
    if (colId === 'todo') return this.tasks.todo;
    if (colId === 'progress') return this.tasks.progress;
    if (colId === 'done') return this.tasks.done;
    return [];
  }

  openModal() { this.showModal = true; }
  closeModal() { this.showModal = false; this.newTaskText = ""; }

  addTask() {
    if (this.newTaskText.trim()) {
      this.tasks.todo.push(this.newTaskText.trim());
      this.closeModal();
      this.saveBoard();
    }
  }

  onDragStart(event: DragEvent, task: string, sourceCol: string) {
    event.dataTransfer?.setData('task', task);
    event.dataTransfer?.setData('sourceCol', sourceCol);
  }

  onDrop(event: DragEvent, targetCol: string) {
    const task = event.dataTransfer?.getData('task');
    const sourceCol = event.dataTransfer?.getData('sourceCol') as keyof typeof this.tasks;

    if (task && sourceCol && sourceCol !== targetCol) {
      this.tasks[sourceCol] = this.tasks[sourceCol].filter(t => t !== task);
      (this.tasks as any)[targetCol].push(task);
      this.saveBoard();
    }
  }

  clearBoard() {
    if (confirm("Očisti cijelu ploču?")) {
      this.tasks = { todo: [], progress: [], done: [] };
      this.saveBoard();
    }
  }

  saveBoard() {
    localStorage.setItem(`kanban_${this.korisnikEmail}`, JSON.stringify(this.tasks));
  }

  loadBoard() {
    const data = localStorage.getItem(`kanban_${this.korisnikEmail}`);
    if (data) this.tasks = JSON.parse(data);
  }

  async exportPDF() {
    const data = document.getElementById('kanban-board');
    if (data) {
      const canvas = await html2canvas(data);
      const imgWidth = 208;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(contentDataURL, 'PNG', 0, 10, imgWidth, imgHeight);
      pdf.save('kanban_ploca.pdf');
    }
  }
}