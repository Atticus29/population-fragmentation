import { Component, OnInit } from '@angular/core';
import { DrawingService } from '../drawing.service';
import { Genotype } from '../genotype.model';
import { ColorNameService } from '../color-name.service';
import { PopulationGenerationService } from '../population-generation.service';

@Component({
  selector: 'app-lizard-display',
  templateUrl: './lizard-display.component.html',
  styleUrls: ['./lizard-display.component.css'],
  providers: [DrawingService]
})
export class LizardDisplayComponent implements OnInit {

  constructor(private ds: DrawingService, private cns: ColorNameService, private popgenservice: PopulationGenerationService) { }

  ngOnInit() {
      let testIndividual = this.popgenservice.makeIndividual("green", "blue");
      let genotype = testIndividual.getGeneByName("spot color").getGenotype();
      console.log(genotype);

      //TODO for future more interesting color support, work on this and the color-name service
      // let result = this.cns.getJSON("http://thecolorapi.com/id?hex=00FF00&format=json");
      // result.subscribe(newResult =>{
      //   console.log(newResult);
      // });

      this.ds.drawLizard('lizard-canvas1', genotype);
      // this.ds.drawLizard('lizard-canvas2', genotype2);
      // this.ds.drawLizard('lizard-canvas3', genotype3);
  }

}
