import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Problem } from './problem.model';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private problemArraySource: BehaviorSubject<Problem[]> = new BehaviorSubject<Problem[]>(new Array<Problem>());
  problemArray = this.problemArraySource.asObservable();

  private questionsAnsweredSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean> (false);
  questionsAnswered = this.questionsAnsweredSource.asObservable();

  constructor() {
    console.log(this.questionsAnswered);
    this.questionsAnsweredSource.next(false);
    console.log(this.questionsAnswered);
  }

  addProblemToList(problem: Problem){
    this.problemArraySource.pipe(take(1)).subscribe((problems: Array<Problem>) =>{
      problems.push(problem);
      this.problemArraySource.next(problems);
    });
  }

  getProblems(startNum: number, endNum: number): Problem[]{
    return
  }

  clearQuestions(){
    console.log("clearQuestions called");
    this.problemArraySource.pipe(take(1)).subscribe((problems: Array<Problem>) =>{
      this.problemArraySource.next(new Array<Problem>());
    });
  }

  markQuestionsPt1Answered(){
    console.log("markQuestionsPt1Answered happens");
    this.questionsAnsweredSource.next(true);
  }
}
