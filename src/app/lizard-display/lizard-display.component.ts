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
      //TODO for future more interesting color support, work on this and the color-name service
      // let result = this.cns.getJSON("http://thecolorapi.com/id?hex=00FF00&format=json");
      // result.subscribe(newResult =>{
      //   console.log(newResult);
      // });
  }

  ngAfterViewInit(){
    this.canvases.forEach(canvas =>{
      // console.log(canvas);
    });
    this.popManager.currentPopulation.subscribe(results =>{
      console.log(results);
      this.individuals = results.getIndividuals();
    })
    // console.log(this.canvases.toArray());
    this.ds.drawLizard(this.canvases.toArray()[0], this.genotypeTest);
  }
}
