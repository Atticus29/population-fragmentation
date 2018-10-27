import { Component, OnInit } from '@angular/core';
import { Problem } from '../problem.model';

@Component({
  selector: 'app-problem-display',
  templateUrl: './problem-display.component.html',
  styleUrls: ['./problem-display.component.css']
})
export class ProblemDisplayComponent implements OnInit {
  private problem: Problem;
  private letters: string[] = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  constructor() { }

  ngOnInit() {
    this.problem = new Problem("What is your favorite color?", ["orange", "red", "violet", "blue", "green"], "green");
  }

}
