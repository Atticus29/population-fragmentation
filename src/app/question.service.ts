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

  private questionsAnsweredSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  questionsAnswered = this.questionsAnsweredSource.asObservable();

  constructor() {
    this.questionsAnsweredSource.next(false);
    this.questionsAnswered.subscribe(result =>{
    });
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
    this.problemArraySource.pipe(take(1)).subscribe((problems: Array<Problem>) =>{
      this.problemArraySource.next(new Array<Problem>());
    });
  }

  markQuestionsPt1Answered(){
    this.questionsAnsweredSource.next(true);
  }
}
