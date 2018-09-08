import { Injectable } from '@angular/core';
import { Organism } from './organism.model';

@Injectable({
  providedIn: 'root'
})
export class RandomMatingService {
  matedPairs: Array<Organism>
  constructor() { }


}
