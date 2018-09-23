import { Component } from '@angular/core';

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
  setDisplayLizards(shouldLizardsDisplay: boolean){
    this.displayLizards = shouldLizardsDisplay;
  }

  setDisplayQuestions(shouldQuestionsDisplay: boolean){
    this.displayQuestions = shouldQuestionsDisplay;
  }

  setMatingDisplay(shouldMatingsDisplay: boolean){
    console.log("got here!!");
    console.log(shouldMatingsDisplay);
    this.displayMatings = shouldMatingsDisplay;
  }
}
