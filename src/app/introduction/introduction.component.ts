import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.css']
})
export class IntroductionComponent implements OnInit {
  private text: string = "In this simulation, you will be learning about how population fragmentation increases the rate at which genetic diversity is lost. The class will be simulating two populations—one intact, and one fragmented into three subpopulations that can’t reach (and therefore can’t mate with) each other. You’ll be simulating a population of snarl-toothed draggles. Scientists have recently discovered that a single gene fully controls spot color, which is the gene you’ll be tracking through the generations."

  constructor() { }

  ngOnInit() {
  }

}
