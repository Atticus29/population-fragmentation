# DraggleSimulator: and Open Source Web Application for Teaching Genetic Drift

By: Mark Fisher TODO see how others do this
January, 2019

## For The Instructor: What is DraggleSimulator?

TODO add user video here

The concept of genetic drift in population genetics is a notoriously difficult concept to teach and to learn. DraggleSimulator is an open-source simulation webapp that allows students to create a metapopulation of fictitious, diploid, monogamous, and simultaneously-hermaphroditic animals with replacement-level fertility (2 offspring per couple) called draggles and track it across generations. Upon creation, this metapopulation satisfies all assumptions of Hardy-Weinberg Equilibrium except infinite population size (thereby only allowing the sampling error that accounts for genetic drift). By experimenting in either a guided fashion as seen in this example instance (Population Simulator)[www.populationsimulator.com] or in a less-structured fashion, students can explore how allele frequencies can change in populations even in the absence of nonrandom mating, natural selection, mutation, or migration. They can compare how allele frequencies change in populations of different sizes or in metapopulations of the same total size but with different numbers of isolated subpopulations. For instance, I used the simulation to help students explore the effects of fragmenting populations on genetic diversity.

The simulation tracks individuals over the course of any number of generations with respect to one gene that is necessary and sufficient to determine spot color in the fictitious draggles. Currently, the simulation tracks three alleles at this gene (although it should not be difficult to extend this).

At the beginning of the simulation, users are able to specify parameters including:
 * population size
 * number of fragments into which the metapopulation is split
 * number of generations to follow the metapopualtion
 * starting allele frequencies of three alleles of the spot color gene

Each generation of the simulation, the user must answer several questions about allele frequencies of the current generation of the metapopulation. Then, the user is prompted to assign two individuals in the same subpopulation that are currently unmated (the "Shuffle and Designate a Random Pair to Mate" button) to form a mated pair for each subpopulation. Afterwards, users are taken a to a new component of the app that displays the mated pairs and prompts the user to generate two offspring (this should be easily extensible to more or fewer offspring TODO). Once all possible offspring are generated for each pair (i.e., currently 2 to reflect replacement-level fertility), the user is then escorted to a new component that displays the new generation of offspring as a fresh metapopulation. If this is not the final generation, the user is again prompted to answer questions about allele frequencies for the new generation. The sequence of components continues as described above until the final generation selected by the user at the beginning of the simulation is reached. At this point, the user is guided to a final component. Instructors can add any questions they might like to this component, or they can link students to google sheets or google forms to make collaborative spreadsheets and answer easily-graded questions.

## Software Features and Details for Other Contributors

DraggleSimulator currently only simulates genetic drift, but contains object models for metapopulations, populations, mated-pairs, organisms, genotypes, genes, and alleles. Consequently, the infrastructure for simulating other forces or combinations of forces that drive evolutionary change is already in place. The current infrastructure of DraggleSimulator is also amenable to the addition of alleles to the single gene ("spot color") currently tracked or indeed to the addition of more genes (perhaps to teach about linkage disequilibrium).

The questions are managed and persisted across the components by injecting a service called QuestionService. Each question is an instance of the "problem" model.

Similarly, the metapopulations, which, depending on user input from the form, consist of one or more subpopulations, are persisted across components by injecting a service called PopulationManagerService. Both of these services track the status of their respective TODO LEFT OFF HERE.. There is currently no "Generation" model explicitly; all generations are tracked as (BehaviorSubject)[TODO url link] of an array of the Metapopulation model. This BehaviorSubject, along with many of BehaviorSubject objects that track various metapopulation features and statistics are housed in the PopulationManagerService.

DraggleSimulator is not currently optimized to be viewed on a mobile device.

## Known Bugs
TODO add link to bugs.md
TODO direct them to github issues page if they find a new bug

## How to Set Up Your Own Instance of DraggleSimulator in Amazon Web Services
TODO add some instructions with links and a video here.

## How to Set Up Your Own Instance of The Example in populationsimulator.com

1. Clone
1. Checkout v1.1 branch TODO check
1. Add any personal questions in TODO.doc
1. Add URL to your personal google form (TODO make a copy of this one) TODO google can people copy google forms they don't have edit rights to?
1. Follow the same instructions about, but use this build instead

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
