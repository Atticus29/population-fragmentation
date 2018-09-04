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
    this.ds.drawTriangle(37.5,87.5,37.5,112.5,25,100, 'lizard-canvas',"black", true);
    this.ds.drawArc(37.5, 100, 12.5, 3*Math.PI/2, Math.PI/2, 'lizard-canvas',"black", true);
    // this.ds.drawEllipse(100, 100, 50, 25, 45 * Math.PI/180,  0, 2 * Math.PI, 'lizard-canvas', 'black', false);
    // this.ds.drawEllipse(100, 100, 50, 25, 0, 0, 2*Math.PI, 'lizard-canvas', 'black', true);
  }

}
