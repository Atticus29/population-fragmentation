import { Component, OnInit } from '@angular/core';
import { DrawingService } from '../drawing.service';
import { Genotype } from '../genotype.model';

@Component({
  selector: 'app-lizard-display',
  templateUrl: './lizard-display.component.html',
  styleUrls: ['./lizard-display.component.css'],
  providers: [DrawingService]
})
export class LizardDisplayComponent implements OnInit {

  constructor(private ds: DrawingService) { }

  ngOnInit() {
      let genotype1: Genotype = new Genotype("#00FF00", "#FF00FF");
      let genotype2: Genotype = new Genotype("#00FF00", "#00FFFF");
      let genotype3: Genotype = new Genotype("#FF00FF", "#00FFFF");
      this.ds.drawLizard('lizard-canvas1', genotype1);
      this.ds.drawLizard('lizard-canvas2', genotype2);
      this.ds.drawLizard('lizard-canvas3', genotype3);
  }

}
