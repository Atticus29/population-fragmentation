import { Component, OnInit } from '@angular/core';

import { Subject } from "rxjs";
import { takeUntil } from 'rxjs/operators';

import { ConfigurationService } from '../configuration.service';
// import { masterConfigProperties } from '../masterConfiguration';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  private introGoogleSheetUrl: String; //= masterConfigProperties.googleSheetUrl;
  private introGoogleFormUrl: String; // = masterConfigProperties.googleFormUrl;
  constructor(private configService: ConfigurationService) { }

  ngOnInit() {
    this.configService.configurationVars.pipe(takeUntil(this.ngUnsubscribe)).subscribe(results =>{
      this.introGoogleSheetUrl = results[0];
      this.introGoogleFormUrl = results[1];
    });
  }

}
