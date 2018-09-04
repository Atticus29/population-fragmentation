import { Component, OnInit } from '@angular/core';
import { DrawingService } from '../drawing.service';

@Component({
  selector: 'app-lizard-display',
  templateUrl: './lizard-display.component.html',
  styleUrls: ['./lizard-display.component.css'],
  providers: [DrawingService]
})
export class LizardDisplayComponent implements OnInit {
  private individualIds = [1,2,3,4];
  constructor(private ds: DrawingService) { }

  ngOnInit() {
    let self = this;
    this.individualIds.forEach(individual => {
      console.log('lizard-canvas' + individual.toString());
      self.ds.drawLizard('lizard-canvas' + individual.toString());
    });
  }

}
