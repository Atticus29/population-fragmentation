import { OnInit, Component, AfterViewInit, QueryList, ElementRef, ViewChildren, Output, EventEmitter } from '@angular/core';
import { DrawingService } from '../drawing.service';
import { Genotype } from '../genotype.model';
import { Gene } from '../gene.model';
import { Organism } from '../organism.model';
import { Population } from '../population.model';
import { ColorNameService } from '../color-name.service';
import { IndividualGenerationService } from '../individual-generation.service';
import { PopulationManagerService } from '../population-manager.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-lizard-display',
  templateUrl: './lizard-display.component.html',
  styleUrls: ['./lizard-display.component.css'],
  providers: [DrawingService]
})
export class LizardDisplayComponent implements OnInit, AfterViewInit {
  @ViewChildren('canvases') canvases: QueryList<ElementRef>;

  private subpopulations: Array<Population>;
  // private individuals: Array<Organism>;
  private genotypeTest: Genotype;

  private isMatingComponentOpen: boolean = false;
  @Output() openMatingComponentEmitter = new EventEmitter<boolean>();

  constructor(private ds: DrawingService, private cns: ColorNameService, private individualGenService: IndividualGenerationService, private popManager: PopulationManagerService) { }

  ngOnInit() {
      this.popManager.currentMetaPopulation.pipe(take(1)).subscribe(metapopulation =>{
        this.subpopulations = metapopulation.getSubpopulations();
        console.log(this.subpopulations);
      });

      this.popManager.calculateAlleleFrequency("blue", false).subscribe(result =>{
        //TODO fix
        // console.log(result);
      });

      this.popManager.calculateAlleleFrequency("green", false).subscribe(result =>{
        // console.log(result);
      });

      this.popManager.calculateAlleleFrequency("magenta", false).subscribe(result =>{
        // console.log(result);
      });

      this.popManager.generations.pipe(take(1)).subscribe(results=>{
        // console.log(results);
      });

      //TODO for future more interesting color support, work on this and the color-name service
      // let result = this.cns.getJSON("http://thecolorapi.com/id?hex=00FF00&format=json");
      // result.subscribe(newResult =>{
      //   console.log(newResult);
      // });
  }

  ngAfterViewInit(){
    let canvasArray = this.canvases.toArray();
    for(let i = 0; i<this.subpopulations.length; i++){
      //assumes subpopulations MUST be equal size TODO improve this
      let currentSubpopulation = this.subpopulations[i];
      for(let j = 0; j<currentSubpopulation.getIndividuals().length; j++){
        let currentIndividual = currentSubpopulation.getIndividuals()[j];
        let canvasNum = (i)*currentSubpopulation.getIndividuals().length + j;
        console.log("canvasNum");
        console.log(canvasNum);
        this.ds.drawLizard(canvasArray[canvasNum], currentIndividual.getGeneByName("spot color").getGenotype());
      }
    }
    // for(let i = 0; i<canvasArray.length; i++){
    //   console.log(i);
    //   //TODO fix
    //   this.subpopulations.forEach(subpopulation =>{
    //     let individuals = subpopulation.getIndividuals();
    //     individuals.forEach(individual =>{
    //       // console.log(individual.getGeneByName("spot color").getGenotype());
    //       this.ds.drawLizard(canvasArray[i], individual.getGeneByName("spot color").getGenotype());
    //     });
    //   });
    // }
  }

  pickTwoToMate(){
    console.log("go to pickTwoToMate");
    this.popManager.getScrambledPopulation().pipe(take(1)).subscribe(results =>{
      //TODO pick the next two on the scrambled list that haven't mated, add them to matedPair array and change their canvas directive
    });
  }

  openMatingComponent(){
    this.isMatingComponentOpen = true;
    this.openMatingComponentEmitter.emit(this.isMatingComponentOpen);
  }
}
