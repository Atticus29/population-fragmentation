import { OnInit, Component, AfterViewInit, QueryList, ElementRef, ViewChildren } from '@angular/core';
import { DrawingService } from '../drawing.service';
import { Genotype } from '../genotype.model';
import { Gene } from '../gene.model';
import { Organism } from '../organism.model';
import { ColorNameService } from '../color-name.service';
import { IndividualGenerationService } from '../individual-generation.service';
import { PopulationManagerService } from '../population-manager.service';

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

  constructor(private ds: DrawingService, private cns: ColorNameService, private individualGenService: IndividualGenerationService, private popManager: PopulationManagerService) { }

  ngOnInit() {
      let testIndividual: Organism = this.individualGenService.makeIndividual("green", "blue");
      this.popManager.addOrganismToPopulation(testIndividual);
      this.popManager.currentPopulation.subscribe(results =>{
        this.individuals = results.getIndividuals();
      });

      //TODO for future more interesting color support, work on this and the color-name service
      // let result = this.cns.getJSON("http://thecolorapi.com/id?hex=00FF00&format=json");
      // result.subscribe(newResult =>{
      //   console.log(newResult);
      // });
  }

  ngAfterViewInit(){
    console.log("got into ngAfterViewInit");
    let canvasArray = this.canvases.toArray();
    for(let i = 0; i<canvasArray.length; i++){
      console.log(canvasArray[i]);
      console.log(this.individuals[i].getGeneByName("spot color").getGenotype());
      this.ds.drawLizard(canvasArray[i], this.individuals[i].getGeneByName("spot color").getGenotype());
    }
  }
}
