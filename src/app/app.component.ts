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
  setDisplayLizards(shouldLizardsDisplay: boolean){
    console.log("hi there!");
    console.log(shouldLizardsDisplay);
    this.displayLizards = shouldLizardsDisplay;
  }

  setDisplayQuestions(shouldQuestionsDisplay: boolean){
    this.displayQuestions = shouldQuestionsDisplay;
  }
}
