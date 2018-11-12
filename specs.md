# Bugs

## High Priority
- [ ] TODO try without the detect changes
- [ ] TODO have this disable the button somehow or disable the button before this happens
- [ ] when there are multiple subpopulations, the done button appears for all populations
- [ ] TODO this is not true fix
- [ ] Stepper is displaying super weird text in white ("create")
- [ ] make getCurrentGenerationNumber work
- [ ] Some of the lizard names in lizard display aren't centered
- [x] Canvases of metapopulation not displaying after first couple is randomly selected, but gets restored after that continues
- [x] Canvases of matedPairs not displaying (I think it has something to do with them not being dynamically generated)
- [x] You can submit the form with a negative number of fragments
- [x] You can submit the form with a negative number of generations
- [x] fix bug where designate a random pair to mate button doesn't disappear
- [x] fix bug where I'm ready to answer questions about this population doesn't disappear in the second lizard-display (should it?)
- [x] Generation number doesn't currently validate
- [x] fix issue where it won't display the correct questions
- [x] Use population manager to add the baby to the new generation
- [x] mark the new generation as completed if every subpopulation is completed
- [x] the generation source's most recent addition should be a completed meta population, so 1 plus that is the current generation;
- [x] the changing of the guard happens when the last baby possible is made
- [x] Check whether all babies have been made, and if so, mark the offspring generation as complete
- [x] After complete, add a new generation to the array (from the nextGeneration behavior subject)
- [x] left off //TODO get expectedBabyCount in other observable
- [x] Each couple can make infinite babies
- [x] Allele frequency validation 0.2, 0.7, 0.1 doesn't work
- [x] Seems to be adding new subpopulations every time you click (even though it adds to already existing ones when warranted)
- [x] Does not remove the mated pairs when you clear population
- [x] Errors out when you try to mate a population of size 1 (what about odd pop sizes?)
- [x] Errors out when you try to mate but nobody in the population is eligible
- [x] negative and 0 frag numbers don't throw errors....
- [x] the real-time pre-submission validation no longer seems to be working?
- [x] getScrambledPopulation doesn't work yet (I think because child shuffle doesn't work as advertised)
- [x] Grid layout in app.component.html is not working (no longer relevant)
- [x] Form doesn't validate
- [x] Form doesn't check for invalid allele frequency entries
- [x] generateMetaPopulation doesn't handle small population sizes or large fragments well
    - [x] E.g., popSize 1 frag 2 (see form validation)
    - [x] E.g., popSize 2 frag 2 (always blue blue homozygotes)
- [x] Accommodate different behaviorSubjects in calculateAlleleFrequency in population-manager
- [x] components that conceptually should not be nested in the form were... extract them and deal with inputs and outputs
- [x] <app-mate> isn't working
- [x] improve styling of appMated directive
- [x] appMated directive has been implemented but the styling has not and nothing has been tested
- [x] No mated pair model has been generated for mate component to use
- [x] Dynamically generated canvas elements can't be targeted by the drawLizard() method, making the lizard rendering impossible currently
- [x] Pet names require() not working in population-generation service
- [x] Shifting focus to the questions div upon click of the form button doesn't work
- [x] The population size is rounded down right now in generatePopulation in population-manager service
    - [x] Add a generateSingleIndividualGivenAlleleFrequencies
- [x] When you enter 5 individuals, six are generated
- [x] You need to click twice to re-seed population (maybe change to disabling generate population button until you hit clear population button?)


## Low Priority
- [ ] define "primary" color so that it can be accessed
- [ ] make the draw thing scale by %, rather than having pixels everywhere
- [ ] app-focus directive should point to top of draggles or to questions?
- [ ] Table is not loading allele frequencies because of asynchronicity issue
- [ ] Color name service is incomplete and is low priority at this point so has been abandoned
- [ ] DRY up by removing all of the population stuff (cf. the metapopulation stuff in population-manager.service)
- [x] Grid layout for angular material not working well to display the draggle cards
- [x] if you press next question when there are no more questions, it takes two clicks to go back

## No longer relevant
- [x] Grid list is not allowing rowHeight to fit contents of lizard display

# Specs

- [x] User can choose starting total population size
- [x] User can choose number of population fragments
- [x] User can choose the number of generations to track
- [x] User can choose allele frequencies of brown, green, and magenta alleles
  - [x] Default frequency is ~1/3, ~1/3, ~1/3
- [x] User can see the individuals in their population(s)
	- [x] Lizard drawings
		- [x] Stripe colors according to alleles
	- [x] Lizard names are displayed
	- [x] Lizard alleles are displayed for each individual
  - [ ] Each lizard has a unique name
- [x] When user submits form, they see a individuals with GENOTYPE frequencies roughly equal to those of a HWE population with the given allele frequencies
- [x] User is asked to calculate expected genotype frequencies
- [x] User is asked whether the calculated frequencies match the observed (they should)
- [ ] Users can see a table of allele frequency for each generation
- [ ] Users can roll a die of size N (where N is number of individuals in certain subpopulation)
- [x] Mated pairs are displayed
- [x] Gametes of each individual are displayed
- [ ] User clicks on make baby button under each pair and sees:
	- [ ] Which gamete each parent give to offspring
	- [ ] the offspring resulting from mating events (the lizard with its spots)
	- [x] User no longer sees make baby button after two (x) babies are made


- [ ] When all babies are made, user is asked to calculate allele frequencies of new offspring generation

- [ ] User sees offspring population replace their parents
- [ ] User repeats process above until 10 (x) generations are done
- [ ] User sees the allele frequencies of each generation
