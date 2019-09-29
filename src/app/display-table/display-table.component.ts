import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { DisplayTableDataSource } from './display-table-datasource';
import { PopulationManagerService } from '../population-manager.service';
import { IndividualGenerationService } from '../individual-generation.service';

@Component({
  selector: 'app-display-table',
  templateUrl: './display-table.component.html',
  styleUrls: ['./display-table.component.css']
})
export class DisplayTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: DisplayTableDataSource;
  constructor(private cdr: ChangeDetectorRef, private popManager: PopulationManagerService){};

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['generation', 'fragment', 'fragmentPopSize', 'cyanCount', 'greenCount', 'magentaCount'];

  ngOnInit() {
    this.popManager.currentMetaPopulation.subscribe(results=>{
      // console.log("how about from within data-table component?");
      // this.cdr.detectChanges();
      // console.log(results);
      this.dataSource = new DisplayTableDataSource(this.paginator, this.sort, this.popManager);
    });
  }
}
