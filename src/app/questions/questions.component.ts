import { Component, OnInit } from '@angular/core';
import { masterConfigProperties } from '../masterConfiguration';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  private introGoogleSheetUrl: string = masterConfigProperties.googleSheetUrl;
  private introGoogleFormUrl: string = masterConfigProperties.googleFormUrl;
  constructor() { }

  ngOnInit() {
  }

}
