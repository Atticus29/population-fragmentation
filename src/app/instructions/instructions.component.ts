import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
  private heading: string = "Instructions";
  private instructions: string[] = ["TODO"];
  constructor() { }

  ngOnInit() {
  }

}
