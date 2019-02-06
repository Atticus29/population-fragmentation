import { Component, OnInit } from '@angular/core';

import { Subject } from "rxjs";
import { takeUntil } from 'rxjs/operators';

import { masterConfigProperties } from '../masterConfiguration';
import { ConfigurationService } from '../configuration.service';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
  private heading: String = "Instructions";
  private instructions: String[] = ["Practice allele frequency calculations with your instructor", "Practice genotype frequency calculations with your instructor", "Practice expected heterozygosity calculations with your instructor", "Work through this simulation module, making sure to TRACK ALLELE FREQUENCIES OF EVERY SUBPOPULATION/FRAGMENT for EVERY generation","We'll start with 10 generations and the default allele frequencies", "Enter calculated allele frequencies in the spreadsheet", "Use allele frequecies to calculate expected genotype frequencies and expected heterozygosity", "Discuss class results", "Answer online worksheet questions"];
  private introGoogleSheetUrl: String = masterConfigProperties.googleSheetUrl;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private configService: ConfigurationService) { }

  ngOnInit() {
    this.configService.configurationVars.pipe(takeUntil(this.ngUnsubscribe)).subscribe(results =>{
      console.log(results[0]);
      console.log(results[1]);
      this.introGoogleSheetUrl = results[0];
    });
  }

}
