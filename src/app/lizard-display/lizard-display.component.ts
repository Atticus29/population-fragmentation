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
  @ViewChildren('canvas') canvases: QueryList<ElementRef>;
  private individuals: Array<Organism>;
  private genotypeTest: Genotype;

  constructor(private ds: DrawingService, private cns: ColorNameService, private individualGenService: IndividualGenerationService, private popManager: PopulationManagerService) { }

  ngOnInit() {

      //TODO delete me after fleshed out more
      // let testIndividual: Organism = this.individualGenService.makeIndividual("green", "blue");
      // this.genotypeTest = testIndividual.getGeneByName("spot color").getGenotype();
      // this.individuals.push(testIndividual);
      // this.popManager.addOrganismToPopulation(testIndividual);
      //TODO for future more interesting color support, work on this and the color-name service
      // let result = this.cns.getJSON("http://thecolorapi.com/id?hex=00FF00&format=json");
      // result.subscribe(newResult =>{
      //   console.log(newResult);
      // });

      // this.ds.drawLizard('lizard-canvas0', genotype);
      // this.ds.drawLizard('lizard-canvas2', genotype2);
      // this.ds.drawLizard('lizard-canvas3', genotype3);
  }

  ngAfterViewInit(){
    // console.log(this.canvases);
    this.canvases.forEach(canvas =>{
      // console.log(canvas);
    });
    // let testIndividual: Organism = this.individualGenService.makeIndividual("green", "blue");
    // this.genotypeTest = testIndividual.getGeneByName("spot color").getGenotype();
    // this.popManager.addOrganismToPopulation(testIndividual);
    this.popManager.currentPopulation.subscribe(results =>{
      console.log(results);
      this.individuals = results.getIndividuals();
    })
    // console.log(this.canvases.toArray());
    this.ds.drawLizard(this.canvases.toArray()[0], this.genotypeTest);
  }
}
