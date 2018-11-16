import { Component, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material';

import { take, takeUntil } from 'rxjs/operators';
import { Subject } from "rxjs";

import {PopulationManagerService } from './population-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  private displayLizards: boolean = false;
  private displayQuestions: boolean = false;
  private displayMatings: boolean = false;
  private rowHeight: number = 5000; //TODO make this dynamic //window.innerHeight;
  // this.rowHeight = window.innerHeight;
  private generations = [0];
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private popManager:PopulationManagerService){}

  ngOnInit() {
    this.popManager.metapopulationGenerations.pipe(takeUntil(this.ngUnsubscribe)).subscribe(generationsOfMetapopulations =>{
      let genNum = generationsOfMetapopulations.length;
      let currentGenNum = 0;
      this.generations = [0];
      // for(let i = 1; i<genNum; i++){
      //   this.generations.push(i);
      // }
    });
  }

  setDisplayLizards(shouldLizardsDisplay: boolean){
    this.displayLizards = shouldLizardsDisplay;
  }

  setDisplayQuestions(shouldQuestionsDisplay: boolean){
    this.displayQuestions = shouldQuestionsDisplay;
  }

  setMatingDisplay(shouldMatingsDisplay: boolean){
    // console.log(shouldMatingsDisplay);
    this.displayMatings = shouldMatingsDisplay;
  }

  takeNextStep(shouldTakeTheNextStep: boolean, stepperMain: MatStepper){
    console.log("got to takeNextStep");
    stepperMain.next();
  }

  repeatStepperForNewGen(shouldTakeTheNextStep: boolean, stepperMain: MatStepper){
    console.log("got to repeatStepperForNewGen");
  }
}
