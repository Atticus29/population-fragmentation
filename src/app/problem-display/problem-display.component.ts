import { Component, OnInit } from '@angular/core';
import { Problem } from '../problem.model';
import { take } from 'rxjs/operators';
import { QuestionService } from '../question.service';
import { PopulationManagerService } from '../population-manager.service';

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
  private question: string;
  private userSelectedAnswer: string;
  private displayCorrect: boolean = false;
  private displayIncorrect: boolean = false;
  private previousQuestionExists: boolean = false; //TODO make dynamic
  private nextQuestionExists: boolean = false; //TODO make dynamic
  private letters: string[] = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  constructor(private qs: QuestionService, private popManager: PopulationManagerService) { }

  ngOnInit() {
    this.currentProblemIndex = 0;
    this.question = "Whoops!";
    this.choices = ["No question has been generated yet. Try creating a population"];
    this.qs.problemArray.subscribe((problems: Array<Problem>)=>{
      console.log("problem display");
      console.log(problems);
      if(problems && problems.length > 0){
        console.log("some problems are in the problem array!");
        this.problems = problems;
        this.recalibrateNextAndPreviousButtons();
        this.currentProblem = this.problems[this.currentProblemIndex];
        this.choices = this.currentProblem.getChoices();
        this.question = this.currentProblem.getQuestion();
      } else{
        this.currentProblemIndex = 0;
        this.question = "Whoops!";
        this.choices = ["No question has been generated yet. Try creating a population"];
      }
    });
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
    if(this.currentProblemIndex < this.problems.length-1 ){
      this.currentProblemIndex ++;
      this.recalibrateNextAndPreviousButtons();
      this.currentProblem = this.problems[this.currentProblemIndex];
      this.choices = this.currentProblem.getChoices();
      this.question = this.currentProblem.getQuestion();
    }
  }

  previousQuestion(){
    this.resetCorrectStatusDisplay();
    if(this.currentProblemIndex > 0){
      this.currentProblemIndex --;
      this.recalibrateNextAndPreviousButtons();
      this.currentProblem = this.problems[this.currentProblemIndex];
      this.choices = this.currentProblem.getChoices();
      this.question = this.currentProblem.getQuestion();
    }
  }

  recalibrateNextAndPreviousButtons(){
    if (this.currentProblemIndex > 0){
      this.previousQuestionExists = true;
    }
    if(this.currentProblemIndex < 1){
      this.previousQuestionExists = false;
    }
    if(this.currentProblemIndex == this.problems.length -1){
      this.nextQuestionExists = false;
      this.qs.markQuestionsPt1Answered();
    }
    if(this.currentProblemIndex < this.problems.length -1){
      this.nextQuestionExists = true;
    }
  }

}
