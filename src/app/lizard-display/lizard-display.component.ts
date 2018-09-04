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
    this.ds.drawCircle(100, 100, 50, 'lizard-canvas');
  }

}
