import { ChangeDetectorRef, OnInit, Component, AfterViewInit, QueryList, ElementRef, ViewChildren, Output, EventEmitter } from '@angular/core';
import { DrawingService } from '../drawing.service';
import { take } from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';

import { Genotype } from '../genotype.model';
import { Gene } from '../gene.model';
import { Organism } from '../organism.model';
import { Population } from '../population.model';
import { MatedPair } from '../mated-pair.model';

import { ColorNameService } from '../color-name.service';
import { IndividualGenerationService } from '../individual-generation.service';
import { PopulationManagerService } from '../population-manager.service';
import { QuestionService } from '../question.service';
import { MatedSnackbarComponent } from '../mated-snackbar/mated-snackbar.component';

@Component({
  selector: 'app-lizard-display',
  templateUrl: './lizard-display.component.html',
  styleUrls: ['./lizard-display.component.css'],
  providers: [DrawingService, MatSnackBar]
})
export class LizardDisplayComponent implements OnInit, AfterViewInit {
  @ViewChildren('canvases') canvases: QueryList<ElementRef>;

  private subpopulations: Array<Population>;
  private matingsCompleted: boolean = false; //TODO allow to be toggled on
  private displayMateButton: boolean = false; //TODO allow to be toggled on
  private goToQuestions: boolean = true;
  // private individuals: Array<Organism>;
  private genotypeTest: Genotype;

  private isMatingComponentOpen: boolean = false;
  @Output() openMatingComponentEmitter = new EventEmitter<boolean>();

  constructor(private ds: DrawingService, private cns: ColorNameService, private individualGenService: IndividualGenerationService, private popManager: PopulationManagerService, private cdr: ChangeDetectorRef, private qs: QuestionService, public snackBar: MatSnackBar) { }

  ngOnInit() {
      this.popManager.currentMetaPopulation.subscribe(metapopulation =>{ //.pipe(take(1))
        this.subpopulations = metapopulation.getSubpopulations();
        for(let i = 0; i<this.subpopulations.length; i++){
          // console.log("subpopulation " + i.toString());
          let subpopulation = this.subpopulations[i];
          let blueAlleleFreq = this.popManager.calculatePopulationAlleleFrequency("blue", subpopulation);
          // console.log("blue");
          // console.log(blueAlleleFreq);
          let greenAlleleFreq = this.popManager.calculatePopulationAlleleFrequency("green", subpopulation);
          // console.log("green");
          // console.log(greenAlleleFreq);
          let magentaAlleleFreq = this.popManager.calculatePopulationAlleleFrequency("magenta", subpopulation);
          // console.log("magenta");
          // console.log(magentaAlleleFreq);
        }
      });

      // this.popManager.eligibleBachelorsAbsent.subscribe(matingsCompleted =>{
      //   this.matingsCompleted = matingsCompleted;
      //   // this.displayMateButton = false;
      // });

      this.popManager.isEveryoneInTheMetaPopulationMated().subscribe(status =>{
        console.log("status of isEveryoneInTheMetaPopulationMated:");
        console.log(status);
        this.matingsCompleted = status;
        this.displayMateButton = !status; //TODO this won't make it false until it's false everywhere?
      });

      this.qs.questionsAnswered.subscribe(questionsAnswered =>{
        this.displayMateButton = questionsAnswered;
        if(questionsAnswered){
          this.goToQuestions = false;
          // this.displayMateButton = true;
        }
      });

      //TODO for future more interesting color support, work on this and the color-name service
      // let result = this.cns.getJSON("http://thecolorapi.com/id?hex=00FF00&format=json");
      // result.subscribe(newResult =>{
      //   console.log(newResult);
      // });
  }

  ngAfterViewInit(){
    this.drawDraggles();
  }

  drawDraggles(){
    let canvasArray = this.canvases.toArray();
    for(let i = 0; i<this.subpopulations.length; i++){
      //assumes subpopulations MUST be equal size TODO improve this
      let currentSubpopulation = this.subpopulations[i];
      for(let j = 0; j<currentSubpopulation.getIndividuals().length; j++){
        let currentIndividual = currentSubpopulation.getIndividuals()[j];
        let canvasNum = (i)*currentSubpopulation.getIndividuals().length + j;
        // console.log(canvasArray);
        // console.log(canvasNum);
        this.ds.drawLizard(canvasArray[canvasNum], currentIndividual.getGeneByName("spot color").getGenotype());
      }
    }
  }

  pickTwoToMate(subpopNum: number){
    this.popManager.pickTwoToMate(subpopNum);
    this.popManager.getMostRecentMatedPair(subpopNum).pipe(take(1)).subscribe(mostRecentMatedPair =>{
        this.openSnackBar(mostRecentMatedPair.getIndividual1().getOrganismName(), mostRecentMatedPair.getIndividual2().getOrganismName());
    });
    this.popManager.currentMetaPopulation.subscribe(metapopulation =>{ //TODO pipe take(1)?
      // console.log(metapopulation);
      //TODO currently broken
      this.subpopulations = metapopulation.getSubpopulations();
      this.cdr.detectChanges();
      this.drawDraggles();
      this.cdr.detectChanges();
    });

  }

  openSnackBar(name1: string, name2: string) {
    this.snackBar.open(name1 + " and " + name2 + " have been selected", '',{duration: 2000,});
    // this.snackBar.openFromComponent(MatedSnackbarComponent, { //TODO figure out why not working
    //   duration: 3000,
    // });
  }

  openMatingComponent(){
    this.isMatingComponentOpen = true;
    this.openMatingComponentEmitter.emit(this.isMatingComponentOpen);
  }
}
