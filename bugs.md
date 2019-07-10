# Known Bugs

## High Priority Bugs
- [ ] Some of the lizard names in lizard display aren't centered
- [ ] navigating back to inspect population after getting to final question component and clicking I'm ready to answer some final questions doesn't do anything
- [x] When you just hit submit from instructor-config, the validation is a little messed up
- [x] All fragments with one individual is problematic (maybe prevent at the form stage?)
- [x] Table is not loading allele frequencies because of asynchronicity issue
- [x] disable shuffle button until next button on the problems-display has been clicked
- [x] display gen number lots of places
- [x] I don't think the built-in theme is working
- [x] round later questions
- [x] check for generation x fragment number bugs
- [x] flesh out actual content of intro sections
- [x] Displays as correct even after gen 1 questions are done --> when you hit "next" (not next question), it should reset that
- [x] confirm that the generations work with large fragment numbers --> works fine unless you hit clear pop (this should really just be a refresh)
- [x] round the question answers
- [x] check that the new questions reflect the current generation and not the previous generation's allele frequencies
- [x] TODO this is not true fix
- [x] Make it update currentGenNum on population manager every time baby generation get marked complete
- [x] make getCurrentGenerationNumber work
- [x] when there are multiple subpopulations, the done button appears for all populations
- [x] TODO try without the detect changes
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


## Low Priority Bugs
- [x] Grid layout for angular material not working well to display the draggle cards
- [x] if you press next question when there are no more questions, it takes two clicks to go back

## No longer relevant
- [x] Grid list is not allowing rowHeight to fit contents of lizard display
- [x] Stepper is displaying super weird text in white ("create") NO LONGER SEEMS TO BE AN ISSUE??
- [x] define "primary" color so that it can be accessed - resolved when I got the Angular theme fixed
- [x] TODO have this disable the button somehow or disable the button before this happens - sort of fixed. This was accommodated in the case of this being the very last pairing in the entire metapopulation; added ATTN note where this happens.
