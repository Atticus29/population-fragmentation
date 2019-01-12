import { Component, OnInit } from '@angular/core';
import { masterConfigProperties } from '../masterConfiguration';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
  private heading: string = "Instructions";
  private instructions: string[] = ["Practice allele frequency calculations with your instructor", "Practice genotype frequency calculations with your instructor", "Practice expected heterozygosity calculations with your instructor", "Work through this simulation module, making sure to TRACK ALLELE FREQUENCIES OF EVERY SUBPOPULATION/FRAGMENT for EVERY generation","We'll start with 10 generations and the default allele frequencies", "Enter calculated allele frequencies in the spreadsheet", "Use allele frequecies to calculate expected genotype frequencies and expected heterozygosity", "Discuss class results", "Answer online worksheet questions"];
  private introGoogleSheetUrl: string = masterConfigProperties.googleSheetUrl;
  constructor() { }

  ngOnInit() {
    // console.log(this.introGoogleSheetUrl);
  }

}
