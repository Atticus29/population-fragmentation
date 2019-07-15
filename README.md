# DraggleSimulator: An Open Source Web Application for Teaching Genetic Drift

By: Mark Fisher
January, 2019 - July, 2019

## What is DraggleSimulator?

Click image below to watch the tutorial video!
[![Click here to watch the tutorial video!](https://s3.amazonaws.com/www.populationsimulator.com/Screen+Shot+2019-02-05+at+5.38.48+PM.png)](https://youtu.be/izER-V9PTxs)

The concept of genetic drift in population genetics is a notoriously difficult concept to teach and to learn. DraggleSimulator is an open-source simulation webapp that allows students to create a metapopulation of fictitious, diploid, monogamous, and simultaneously-hermaphroditic animals with replacement-level fertility (2 offspring per couple) called draggles and track it across generations. Upon creation, this metapopulation satisfies all assumptions of Hardy-Weinberg Equilibrium except infinite population size (thereby only allowing the sampling error that accounts for genetic drift). By experimenting in either a guided fashion as seen in this example instance (Population Simulator)[https://www.populationsimulator.com/] or in a less-structured fashion, students can explore how allele frequencies can change in populations even in the absence of nonrandom mating, natural selection, mutation, or migration. They can compare how allele frequencies change in populations of different sizes or in metapopulations of the same total size but with different numbers of isolated subpopulations. For instance, I used the simulation to help students explore the effects of fragmenting populations on genetic diversity.

The simulation tracks individuals over the course of any number of generations with respect to one gene that is necessary and sufficient to determine spot color in the fictitious draggles. Currently, the simulation tracks three alleles at this gene (although it should not be difficult to extend this).

At the beginning of the simulation, users are able to specify parameters including:
 * population size
 * number of fragments into which the metapopulation is split
 * number of generations to follow the metapopualtion
 * starting allele frequencies of three alleles of the spot color gene

Each generation of the simulation, the user must answer several questions about allele frequencies of the current generation of the metapopulation. Then, the user is prompted to assign two individuals in the same subpopulation that are currently unmated (the "Shuffle and Designate a Random Pair to Mate" button) to form a mated pair for each subpopulation. Afterwards, users are taken a to a new component of the app that displays the mated pairs and prompts the user to generate two offspring (this should be easily extensible to more or fewer offspring by other contributors). Once all possible offspring are generated for each pair (i.e., currently 2 to reflect replacement-level fertility), the user is then escorted to a new component that displays the new generation of offspring as a fresh metapopulation. If this is not the final generation, the user is again prompted to answer questions about allele frequencies for the new generation. The sequence of components continues as described above until the final generation selected by the user at the beginning of the simulation is reached. At this point, the user is guided to a final component. Instructors can add any questions they might like to this component, or they can link students to google sheets or google forms to make collaborative spreadsheets and answer easily-graded questions.

## How to Set Up Your Own Google Sheets and Google Forms Questions at https://www.populationsimulator.com

Populationsimulator.com is connected to a database, such that you can enter your own URLs to customize DraggleSimulator with your own questions and to track your own class's data. Simply navigate to the expandable menu on the top left of the site in your browser, and click, "Instructors":

![Click instrutors option in the upper left of the site](https://s3.amazonaws.com/www.populationsimulator.com/Screen+Shot+2019-07-15+at+12.49.59+PM.png)

Fill out your information and provide your custom URLs:

![Fill out the small form](https://s3.amazonaws.com/www.populationsimulator.com/Screen+Shot+2019-07-15+at+12.50.10+PM.png)

Click submit, and wait for the database to return a code (a.k.a, "classroom code" or perhaps, "room number"). **Make sure that you communicate this code to your students**!

![classroom code is displayed after processing](https://s3.amazonaws.com/www.populationsimulator.com/Screen+Shot+2019-07-15+at+12.50.26+PM.png)

## Software Features and Details for Other Contributors

DraggleSimulator currently only simulates genetic drift, but contains object models for metapopulations, populations, mated-pairs, organisms, genotypes, genes, and alleles. Consequently, the infrastructure for simulating other forces or combinations of forces that drive evolutionary change is already in place. The current infrastructure of DraggleSimulator is also amenable to the addition of alleles to the single gene ("spot color") currently tracked or indeed to the addition of more genes (perhaps to teach about linkage disequilibrium).

The questions are managed and persisted across the components by injecting a service called QuestionService. Each question is an instance of the "problem" object model.

Similarly, the metapopulations, which, depending on user input from the form, consist of one or more subpopulations, are persisted across components by injecting a service called PopulationManagerService. Both of these services currently track the status of their respective data using various flavors of the [rxjs Subject pattern](https://www.learnrxjs.io/subjects/behaviorsubject.html) (either BehaviorSubjects or ReplaySubjects). There is currently no "Generation" model explicitly; all generations are currently tracked as BehaviorSubject of an array of Metapopulation models (each tracking the metapopulation in one generational snapshot). This BehaviorSubject, along with many of BehaviorSubject objects that track various metapopulation features and statistics are housed in the PopulationManagerService.

DraggleSimulator is not currently optimized to be viewed on a mobile device, but it should be possible to improve some of the css to improve this.

Classroom codes (see How to Set Up Your Own Google Sheets and Google Forms Questions at https://www.populationsimulator.com section above) are persisted on a dynamoDB table using Amazon Web Services. Each classroom code returned to the user (presumably an instructor) will be unique.

## Known Bugs
Known and resolved bugs are tracked [here](https://github.com/Atticus29/population-fragmentation/blob/master/bugs.md)

If you find a new bug or issue to which you'd like to draw my attention, please post about it [here](https://github.com/Atticus29/population-fragmentation/issues)

## How to Set Up Your Own Instance of DraggleSimulator in Amazon Web Services
1. In your terminal, type `git clone https://github.com/Atticus29/population-fragmentation.git`
1. In your terminal, type `cd population-fragmentation` to navigate into the new directory.
1. Sign up for AWS (Amazon Web Services) [here](https://aws.amazon.com/account/). It will require your credit card, but it won't charge you unless you start using non-free-tier services.
1. Watch [this tutorial](https://youtu.be/g9NbuTcos18) for setting up an AWS S3 bucket for static website hosting. If confusing, watch more than one. There are many tutorials on youTube for setting up an AWS S3 bucket for static website hosting that are good, but it many take more than one of them to help wrap your brain around the concept. Don't give up!
1. Acquire IAM credentials and record the access key ID and the secret key as described in the video above.
1. Create a file in population-fragmentation/src/app/ called constants.ts, with the following contents:

```
export var constants = {
    awsAccessKeyId: "YOUR_ACCESS_KEY_HERE",
    awsSecretAccessKey: "YOUR_SECRET_ACCESS_KEY_HERE"
};

```

Paste your access key ID and secret access key into the relevant text fields of the code.

1. If you don't have Node.js installed on your computer, install node (and node package manager, which should be included automatically) by following the instructions on [their website](https://nodejs.org/en/).
1. In your terminal, type `npm install`.
1. In your terminal, type `ng build`.
1. Once completed, navigate to population-fragmentation/dist (the dist directory inside your cloned project). Upload the contents of this folder into your S3 bucket as described in the S3 static website hosting tutorial video mentioned above. Make sure that the permissions of the contents are set to be publicly visible.
1. Visit the url provided for your S3 bucket and share it with your students. Perhaps more easily, simply use the already-existing project at populationsimulator.com

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
Note that unit testing has not yet been implemented in DraggleSimulator.

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Note that e2e testing has not yet been implemented in DraggleSimulator.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
