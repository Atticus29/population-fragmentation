import { OnInit, Component, AfterViewInit, QueryList, ElementRef, ViewChildren, Output, EventEmitter } from '@angular/core';
import { DrawingService } from '../drawing.service';
import { Genotype } from '../genotype.model';
import { Gene } from '../gene.model';
import { Organism } from '../organism.model';
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

  private individuals: Array<Organism>;
  private genotypeTest: Genotype;

  private openMatingComponent: boolean = false;
  @Output() openMatingComponentEmitter = new EventEmitter<boolean>();

  constructor(private ds: DrawingService, private cns: ColorNameService, private individualGenService: IndividualGenerationService, private popManager: PopulationManagerService) { }

  ngOnInit() {
      this.popManager.currentPopulation.pipe(take(1)).subscribe(results =>{
        this.individuals = results.getIndividuals();
      });
      this.popManager.testMethod();

      this.popManager.calculateAlleleFrequency("blue", false).subscribe(result =>{
        console.log(result);
      });

      this.popManager.calculateAlleleFrequency("green", false).subscribe(result =>{
        console.log(result);
      });

      this.popManager.calculateAlleleFrequency("magenta", false).subscribe(result =>{
        console.log(result);
      });

      this.popManager.generations.pipe(take(1)).subscribe(results=>{
        console.log(results);
      });

      //TODO for future more interesting color support, work on this and the color-name service
      // let result = this.cns.getJSON("http://thecolorapi.com/id?hex=00FF00&format=json");
      // result.subscribe(newResult =>{
      //   console.log(newResult);
      // });
  }

  ngAfterViewInit(){
    let canvasArray = this.canvases.toArray();
    for(let i = 0; i<canvasArray.length; i++){
      this.ds.drawLizard(canvasArray[i], this.individuals[i].getGeneByName("spot color").getGenotype());
    }
  }

  pickTwoToMateAndOpenMatingComponentIfClosed(){
    this.openMatingComponent = true;
    this.openMatingComponentEmitter.emit(this.openMatingComponent);
  }
}
