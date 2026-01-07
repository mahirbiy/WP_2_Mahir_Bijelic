import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-whiteboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './whiteboard.component.html',
  styleUrls: ['./whiteboard.component.css']
})
export class WhiteboardComponent implements AfterViewInit {
  @ViewChild('boardCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private drawing = false;


  brushColor: string = '#1E88E5'; 
  brushSize: number = 5;
  isErasing: boolean = false;

  ngAfterViewInit() {
    this.initCanvas();
  }

  initCanvas() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";
  }

  handleDraw(e: any) {
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const clientX = e.clientX || e.touches?.[0]?.clientX;
    const clientY = e.clientY || e.touches?.[0]?.clientY;
    
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    if (e.type === 'mousedown' || e.type === 'touchstart') {
      this.drawing = true;
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
    } else if (e.type === 'mousemove' || e.type === 'touchmove') {
      if (!this.drawing) return;
      this.ctx.lineWidth = this.brushSize;
      this.ctx.strokeStyle = this.isErasing ? "#FFFFFF" : this.brushColor;
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
    } else {
      this.drawing = false;
      this.ctx.beginPath();
    }
  }

  clearBoard() {
    this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
  }
  
  exportPDF() {
    const canvas = this.canvasRef.nativeElement;
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [canvas.width, canvas.height] });
    const image = canvas.toDataURL("image/png");
    pdf.addImage(image, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("moj_crtez.pdf");
  }
}