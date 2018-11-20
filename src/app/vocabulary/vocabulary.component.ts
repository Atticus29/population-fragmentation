import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vocabulary',
  templateUrl: './vocabulary.component.html',
  styleUrls: ['./vocabulary.component.css']
})
export class VocabularyComponent implements OnInit {
  private heading: string = "Vocabulary";
  private description: string = "In order to understand what is actually happening in this lab, you’ll have to learn some genetics vocabulary.";
  private terms: string[] = ["Gene: a unit of DNA that supplies instructions for how a particular polypeptide (like the one that determines spot color) is made.", "Allele: a version of a gene (e.g., the magenta spot color allele, or green, or purple)", "Genotype: The two alleles that any snarl-toothed draggle individual has (one from their mom, and one from their dad, just like you) make up its genotype.", "Genetic drift: Change in allele frequency in a population due to sampling error.", "Sampling error: do you remember how when you were a kid and went trick-or-treating, and sometimes got those two-packs of Starburst candies, only to find out that they were both lemon-flavored (wom wom)? Well, at the Starburst factory, they presumably make just as many red, orange, pink, and yellow Starbursts. So why did two yellow ones end up in your pack? Because of random chance! When the factory has to make a pack of Starbursts (i.e., when it has to “sample”), sometimes the result won’t perfectly reflect the frequencies of things you’re sampling from. So, in this extended analogy, if Starburst flavors are alleles, the allele frequency of the yellow allele in the factory is ¼ flavors, or 25%. But in your package, it’s 2/2, or 100%. This difference is due to sampling error. The population of Starbursts drifted to a frequency of 100% for the yellow flavor allele.", "Expected heterozygosity: a heterozygous genotype is one where there are two different alleles. For instance, an individual with the magenta allele from its mom and the green allele from its dad (bg) would be heterozygous for the spot color gene. An individual with two magenta alleles would be homozygous for the spot color gene. Expected heterozygosity is a number (between 0 and 1) that measures the expected frequency of ALL heterozygous genotypes (e.g., bg, bp, and gp in our three-allele spot color case) given the allele frequencies, if nothing else interesting is happening with the gene (so, for instance, no natural selection is acting on the gene). The point:  expected heterozygosity is a very simple way to measure genetic diversity of a particular gene. The higher the expected heterozygosity for a particular gene in a particular population, the more allelic diversity there is."];

  constructor() { }

  ngOnInit() {
  }

}
