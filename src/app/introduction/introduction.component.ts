import { Component, OnInit } from '@angular/core';
import { of, combineLatest, Subject, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.css']
})
export class IntroductionComponent implements OnInit {
  private booleanBS: BehaviorSubject<boolean> = new BehaviorSubject<boolean> (false);
  private heading: string = "Introduction";
  private text: string = "In this simulation, you will be learning about how population fragmentation increases the rate at which genetic diversity is lost. The class will be simulating two populations—one intact, and one fragmented into three subpopulations that can’t reach (and therefore can’t mate with) each other. You’ll be simulating a population of snarl-toothed draggles. Scientists have recently discovered that a single gene fully controls spot color, which is the gene you’ll be tracking through the generations.";
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor() { }

  ngOnInit() {
    let test = of([1,2,3]).pipe(takeUntil(this.ngUnsubscribe));
    let test2 = of([4,5,6]).pipe(takeUntil(this.ngUnsubscribe));
    combineLatest([test, test2, this.booleanBS]).subscribe(results =>{
      console.log("got here");
      console.log(results);
    });
    // test2.next([7,8,9]);
  }

}
