import { OnInit, Component } from '@angular/core';
import { DrawingService } from '../drawing.service';
import { Genotype } from '../genotype.model';
import { Gene } from '../gene.model';
import { Organism } from '../organism.model';
import { ColorNameService } from '../color-name.service';
import { IndividualGenerationService } from '../individual-generation.service';

@Component({
  selector: 'app-lizard-display',
  templateUrl: './lizard-display.component.html',
  styleUrls: ['./lizard-display.component.css'],
  providers: [DrawingService]
})
export class LizardDisplayComponent implements OnInit {
  private individuals: Array<Organism> = new Array<Organism>();

  constructor(private ds: DrawingService, private cns: ColorNameService, private individualGenService: IndividualGenerationService) { }

  ngOnInit() {

      //TODO delete me after fleshed out more
      let testIndividual: Organism = this.individualGenService.makeIndividual("green", "blue");
      let genotype: Genotype = testIndividual.getGeneByName("spot color").getGenotype();
      this.individuals.push(testIndividual);

      //TODO for future more interesting color support, work on this and the color-name service
      // let result = this.cns.getJSON("http://thecolorapi.com/id?hex=00FF00&format=json");
      // result.subscribe(newResult =>{
      //   console.log(newResult);
      // });

      this.ds.drawLizard('lizard-canvas0', genotype);
      // this.ds.drawLizard('lizard-canvas2', genotype2);
      // this.ds.drawLizard('lizard-canvas3', genotype3);
  }

}
