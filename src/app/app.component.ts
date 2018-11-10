import { Component } from '@angular/core';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  private displayLizards: boolean = false;
  private displayQuestions: boolean = false;
  private displayMatings: boolean = false;
  private rowHeight: number = 5000; //TODO make this dynamic //window.innerHeight;
  // this.rowHeight = window.innerHeight;

  setDisplayLizards(shouldLizardsDisplay: boolean){
    this.displayLizards = shouldLizardsDisplay;
  }

  setDisplayQuestions(shouldQuestionsDisplay: boolean){
    this.displayQuestions = shouldQuestionsDisplay;
  }

  setMatingDisplay(shouldMatingsDisplay: boolean){
    // console.log(shouldMatingsDisplay);
    this.displayMatings = shouldMatingsDisplay;
  }

  takeNextStep(shouldTakeTheNextStep: boolean, stepperMain: MatStepper){
    stepperMain.next();
  }
}
