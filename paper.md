---
title: 'DraggleSimulator: An Open Source Web Application for Teaching Genetic Drift'
tags:
  - genetic drift
  - evolution
  - simulation
  - metapopulation
  - meta population
  - allele frequency
  - allele frequencies
  - Angular
authors:
 - name: Mark A Fisher
   orcid: 0000-0002-7138-7025
   affiliation: "1, 2"
affiliations:
 - name: Portland Community College
   index: 1
 - name: Clark College
   index: 2
date: 15 July 2019
bibliography: paper.bib
---

# Summary

The concept of genetic drift in population genetics is a notoriously difficult concept to teach and to learn. DraggleSimulator is an open-source simulation web application written using Google's Angular framework that allows students to create a metapopulation (a collection of isolated subpopulations) of draggles: fictitious, diploid (meaning they have a mom and a dad and two copies of every gene in their genomes, just like humans), monogamous (only mating with one other individual), and simultaneously-hermaphroditic animals (any individual can mate with any other individual and the sex of the individual is a non-issue). The animals mate at a rate consistent with replacement-level fertility (2 offspring per couple), and the simulator tracks these matings and how they change the composition of alleles (versions of genes) across generations.

Upon creation, this metapopulation satisfies all assumptions of Hardy-Weinberg Equilibrium `[@Hardy:1908]` except infinite population size. These criteria only permit one force of evolutionary change to act: genetic drift, which is brought about by sampling error.

By experimenting in either a guided fashion as seen in this hosted instance of [Draggle Simulator](https://www.populationsimulator.com) or in a less-structured fashion, students can explore how allele frequencies can change in populations even in the absence of nonrandom mating, natural selection, mutation, or migration (the other better-known forces of evolutionary change). The students can compare how allele frequencies change in populations of different sizes or in metapopulations of the same total size but with different numbers of isolated subpopulations (or no isolated subpopulations at all). For instance, the simulation could be used to help students explore the effects of fragmenting populations on genetic diversity, which is what motivated me to write this software in the first place while teaching a conservation genetics unit in an environmental biology class.

# Statement of Need

There are already good tools available for teaching students about genetic drift using simulations online. The problem is that most of the good ones i) cost students or instructors money to use and/or ii) allow for no customizability on the part of the instructor in terms of what types of data s/he wants the students to collect and what types of questions s/he wants to ask the students. DraggleSimulator addresses both of these shortcomings by providing students and instructors with a web application that is free and can be customized with easily-graded questions generated by the instructor using Google Forms (or by allowing the instructor to take advantage of one the default question set that is already publicly available). For information on how to set up these customizable questions, please see instructions in the README file.

DraggleSimulator also emphasizes the discovery-based approach to learning activities that is so popular (and, I think, rightly so) these days by requiring students to click buttons to create offspring and designate pairs of individuals to mate, rather than simply having students click, "run" and watch the simulation take off without understanding the underlying dynamics of how the new allele frequencies are generated and calculated.

I began writing DraggleSimulator with the express intention of making it extensible. The code is [open source and is published on github](https://github.com/Atticus29/population-fragmentation) and is written in a way that follows many best practices. My hope is that potential contributors will find it easy to contribute to the codebase.

# References