import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vocabulary',
  templateUrl: './vocabulary.component.html',
  styleUrls: ['./vocabulary.component.css']
})
export class VocabularyComponent implements OnInit {
  private heading: string = "Vocabulary";
  private description: string = "In order to understand what is actually happening in this lab, you’ll have to learn some genetics vocabulary.";
  private terms: string[] = ["Gene: a unit of DNA that supplies instructions for how a particular polypeptide (like the one that determines spot color) is made.", "Allele: a version of a gene (e.g., the magenta spot color allele, or green, or purple)", "Genotype: The two alleles that any snarl-toothed draggle individual has (one from their mom, and one from their dad, just like you) make up its genotype.", "Genetic drift: Change in allele frequency in a population due to sampling error.", "Sampling error: error arising from the unrepresentativeness of the sample taken. In the case of this simulation, the error arises because each couple only has two offspring, which is a small sampling of all potential offspring they could hypothetically have.", "Expected heterozygosity: a heterozygous genotype is one where there are two different alleles. Expected heterozygosity is a number (between 0 and 1) that measures the expected frequency of ALL POSSIBLE heterozygous genotypes given the allele frequencies if the population is not currently evolving. Expected heterozygosity is a very simple way to measure genetic diversity of a particular gene. The higher the expected heterozygosity for a particular gene in a particular population, the more allelic diversity there is."];

  constructor() { }

  ngOnInit() {
  }

}
