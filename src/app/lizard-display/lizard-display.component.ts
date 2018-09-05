import { Component, OnInit } from '@angular/core';
import { DrawingService } from '../drawing.service';
import { Genotype } from '../genotype.model';
import { ColorNameService } from '../color-name.service';

@Component({
  selector: 'app-lizard-display',
  templateUrl: './lizard-display.component.html',
  styleUrls: ['./lizard-display.component.css'],
  providers: [DrawingService]
})
export class LizardDisplayComponent implements OnInit {

  constructor(private ds: DrawingService, private cns: ColorNameService) { }

  ngOnInit() {
      let genotype1: Genotype = new Genotype("green", "magenta");
      let genotype2: Genotype = new Genotype("lightblue", "green");
      let genotype3: Genotype = new Genotype("magenta", "lightblue");

      //TODO for future more interesting color support, work on this and the color-name service
      // let result = this.cns.getJSON("http://thecolorapi.com/id?hex=00FF00&format=json");
      // result.subscribe(newResult =>{
      //   console.log(newResult);
      // });

      this.ds.drawLizard('lizard-canvas1', genotype1);
      this.ds.drawLizard('lizard-canvas2', genotype2);
      this.ds.drawLizard('lizard-canvas3', genotype3);
  }

}
