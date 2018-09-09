import { Injectable } from '@angular/core';
import { Organism } from './organism.model';

@Injectable({
  providedIn: 'root'
})
export class RandomMatingService {
  matedPairs: Array<Organism>
  constructor() { }

  rollNSideDie(n: number){
    return Math.floor(Math.random() * (n - 1) + 1);
  }
}
