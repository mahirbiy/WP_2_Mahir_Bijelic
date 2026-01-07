import { WhiteboardComponent } from './components/whiteboard/whiteboard.component';
import { KanbanComponent } from './components/kanban/kanban.component';
import { BingoComponent } from './components/bingo/bingo.component';
import { KvizComponent } from './components/kviz/kviz.component';
import { VisionBoardComponent } from './components/vision-board/vision-board.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-fun-zone',
  standalone: true,
  imports: [
    CommonModule, 
    WhiteboardComponent, 
    KanbanComponent, 
    BingoComponent, 
    KvizComponent, 
    VisionBoardComponent
  ],
  templateUrl: './student-fun-zone.component.html',
  styleUrls: ['./student-fun-zone.component.css']
})
export class FunZoneComponent { 

  aktivniAlat: string = 'izbornik'; 

  promijeniAlat(naziv: string) {
    console.log("Kliknuto na: ", naziv);
    this.aktivniAlat = naziv;
  }
}