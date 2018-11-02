import { Component, OnInit } from '@angular/core';
import { Problem } from '../problem.model';
import { QuestionService } from '../question.service';
import { take } from 'rxjs/operators';

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
  private displayCorrect: boolean = false; //TODO change
  private displayIncorrect: boolean = false; //TODO change
  private letters: string[] = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  constructor(private qs: QuestionService) { }

  ngOnInit() {
    this.currentProblemIndex = 0;
    // let problem1 = new Problem("What is your favorite color?", ["orange", "red", "violet", "blue", "green"], "green");
    // let problem2 = new Problem("What is your favorite ice cream?", ["chocolate", "vanilla", "strawberry"], "chocolate");
    // let problem3 = new Problem("What is your favorite animal?", ["cat", "dog", "ant"], "ant");
    // this.qs.addProblemToList(problem1);
    // this.qs.addProblemToList(problem2);
    // this.qs.addProblemToList(problem3);
    this.qs.problemArray.subscribe((problems: Array<Problem>)=>{
      console.log("problem display");
      console.log(problems);
      if(problems && problems.length > 0){
        this.problems = problems;
        this.currentProblem = this.problems[this.currentProblemIndex];
        this.choices = this.currentProblem.getChoices();
        this.question = this.currentProblem.getQuestion();
      }
    });

    // this.problems =
    // this.currentProblem = this.problems[0];
    // this.currentProblemIndex = 0;
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
