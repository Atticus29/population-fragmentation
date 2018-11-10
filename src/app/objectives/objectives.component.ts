import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-objectives',
  templateUrl: './objectives.component.html',
  styleUrls: ['./objectives.component.css']
})
export class ObjectivesComponent implements OnInit {
  private heading: string = "Objectives of the lab: upon completion of this lab, you should be able to:";
  private objectives: string[] = ["Understand the role that genetic drift plays in changing allele frequencies in a population.", "Understand how population size influences genetic drift (is sampling error more pronounced in small populations or large populations?).", "Calculate expected genotype frequencies and the expected heterozygosity given allele frequencies of a gene.", "Comment on how expected heterozygosity of a gene changes in a population due to drift over time.", "Comment on how population fragmentation affects expected heterozygosity in a population over time."];

  constructor() { }

  ngOnInit() {
  }

}
