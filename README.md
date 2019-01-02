# Draggle Drift

## Description

The populations genetics concept of genetic drift is a notoriously difficult concept to teach and to learn. Draggle Drift is an open-source simulation webapp that allows students to create a metapopulation of fictitious diploid simultaneously-hermaphroditic animals called draggles that satisfies all assumptions of Hardy-Weinberg Equilibrium except infinite population size.

The simulation tracks individuals over the course of generations with respect to one gene that is necessary and sufficient to determine spot color in draggles. Currently, three alleles are supported ...In other words, TODO the effect of a phenomenon called genetic drift on genetic diversity.

Users are able to specify parameters including:
 * population size
 * number of fragments into which the metapopulation is split
 * number of generations to follow the metapopualtion
 * starting allele frequencies of three alleles of the spot color gene

In particular, it explores the effect of fragmenting populations on genetic diversity.

## Software Features and Details for Other Contributors

Draggle Drift currently only simulates genetic drift, but contains models for metapopulations, populations, mated-pairs, organisms, genotypes, genes, and alleles. Consequently, simulating other forces or combinations of forces that drive evolutionary change should be relatively straightforward.

The questions are managed and persisted across the stepper components by injecting a service called QuestionService. Each question is an instance of the "problem" model.

Similarly, the metapopulations, which, depending on user input from the form, consist of one or more subpopulations, are persisted across stepper components by injecting a service called PopulationManagerService. Both of these services track the status of their respective TODO

## Software Framework Details

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
