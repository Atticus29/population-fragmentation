import { Component, OnInit } from '@angular/core';
import { Problem } from '../problem.model';

@Component({
  selector: 'app-problem-display',
  templateUrl: './problem-display.component.html',
  styleUrls: ['./problem-display.component.css']
})
export class ProblemDisplayComponent implements OnInit {
  private problems: Problem[];
  private currentProblem: Problem;
  private currentProblemIndex: number;
  private choices: string[];
  private userSelectedAnswer: string;
  private displayCorrect: boolean = false; //TODO change
  private displayIncorrect: boolean = false; //TODO change
  private letters: string[] = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  constructor() { }

  ngOnInit() {
    let problem1 = new Problem("What is your favorite color?", ["orange", "red", "violet", "blue", "green"], "green");
    let problem2 = new Problem("What is your favorite ice cream?", ["chocolate", "vanilla", "strawberry"], "chocolate");
    let problem3 = new Problem("What is your favorite animal?", ["cat", "dog", "ant"], "ant");
    this.problems = [problem1, problem2, problem3];
    this.currentProblem = this.problems[0];
    this.currentProblemIndex = 0;
    // this.choices = this.problem.getChoices();
  }

  resetCorrectStatusDisplay(){
    this.displayCorrect = false;
    this.displayIncorrect = false;
  }

  submitAnswer(answer: string){
    this.resetCorrectStatusDisplay();
    if(answer === this.currentProblem.getAnswer()){
      this.displayCorrect = true;
    } else{
      this.displayIncorrect = true;
    }
  }
  nextQuestion(){
    this.resetCorrectStatusDisplay();
    if(this.currentProblemIndex < this.problems.length){
      this.currentProblemIndex ++;
      this.currentProblem = this.problems[this.currentProblemIndex];
    }
  }

  previousQuestion(){
    this.resetCorrectStatusDisplay();
    if(this.currentProblemIndex > 0){
      this.currentProblemIndex --;
      this.currentProblem = this.problems[this.currentProblemIndex];
    }
  }

}
