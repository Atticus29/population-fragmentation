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
    //head
    this.ds.drawTriangle(37.5,87.5,37.5,112.5,25,100, 'lizard-canvas',"black", true);
    this.ds.drawArc(37.5, 100, 12.5, 3*Math.PI/2, Math.PI/2, 'lizard-canvas',"black", true);

    //body
    this.ds.drawEllipse(100, 100, 50, 10, 0, 0, 2 * Math.PI, 'lizard-canvas', 'black', true);

    //legs
    this.ds.drawEllipse(140, 110, 30, 3, 0.65, 0, 2 * Math.PI, 'lizard-canvas', 'black', true);
    this.ds.drawEllipse(140, 90, 30, 3, 0.9+Math.PI/2, 0, 2 * Math.PI, 'lizard-canvas', 'black', true);
    this.ds.drawEllipse(70, 110, 30, 3, -Math.PI/6, 0, 2 * Math.PI, 'lizard-canvas', 'black', true);
    this.ds.drawEllipse(70, 90, 30, 3, Math.PI/6, 0, 2 * Math.PI, 'lizard-canvas', 'black', true);

    //polka dots
    this.ds.drawArc(60, 101, 3, 0, 2*Math.PI, 'lizard-canvas',"blue", true);
    this.ds.drawArc(77, 95, 3, 0, 2*Math.PI, 'lizard-canvas',"pink", true);
    this.ds.drawArc(100, 102, 3, 0, 2*Math.PI, 'lizard-canvas',"orange", true);
    this.ds.drawArc(109, 94, 3, 0, 2*Math.PI, 'lizard-canvas',"white", true);
    this.ds.drawArc(120, 102, 3, 0, 2*Math.PI, 'lizard-canvas',"green", true);
  }

}
