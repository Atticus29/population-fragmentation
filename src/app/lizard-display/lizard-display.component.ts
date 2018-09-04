import { Component, OnInit } from '@angular/core';
import { DrawingService } from '../drawing.service';

@Component({
  selector: 'app-lizard-display',
  templateUrl: './lizard-display.component.html',
  styleUrls: ['./lizard-display.component.css'],
  providers: [DrawingService]
})
export class LizardDisplayComponent implements OnInit {

  constructor(private ds: DrawingService) { }

  ngOnInit() {
      this.ds.drawLizard('lizard-canvas1');
      this.ds.drawLizard('lizard-canvas2');
      this.ds.drawLizard('lizard-canvas3');
  }

}
