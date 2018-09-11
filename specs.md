# Bugs

## High Priority
- [ ] Dynamically generated canvas elements can't be targeted by the drawLizard() method, making the lizard rendering impossible currently
- [x] Pet names require() not working in population-generation service
- [x] Shifting focus to the questions div upon click of the form button doesn't work

## Low Priority
- [ ] Color name service is incomplete and is low priority at this point so has been abandoned

# Specs

- [x] User can choose starting total population size
- [x] User can choose number of population fragments
- [x] User can choose the number of generations to track
- [x] User can choose allele frequencies of brown, green, and magenta alleles
  - [x] Default frequency is ~1/3, ~1/3, ~1/3
- [ ] User can see the individuals in their population(s)
	- [x] Lizard drawings
		- [x] Stripe colors according to alleles
	- [x] Lizard names are displayed
	- [x] Lizard alleles are displayed for each individual

- [x] User is asked to calculate expected genotype frequencies
- [x] User is asked whether the calculated frequencies match the observed (they should)

- [ ] Users can roll a die of size N (where N is number of individuals in certain subpopulation)
- [ ] Mated pairs are displayed
- [ ] Gametes of each individual are displayed
- [ ] User clicks on make baby button under each pair and sees:
	- [ ] Which gamete each parent give to offspring
	- [ ] the offspring resulting from mating events (the lizard with its spots)
	- [ ] User no longer sees make baby button after two (x) babies are made


- [ ] When all babies are made, user is asked to calculate allele frequencies of new offspring generation

- [ ] User sees offspring population replace their parents
- [ ] User repeats process above until 10 (x) generations are done
- [ ] User sees the allele frequencies of each generation
