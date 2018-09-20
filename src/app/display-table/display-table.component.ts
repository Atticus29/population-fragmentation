import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { DisplayTableDataSource } from './display-table-datasource';

@Component({
  selector: 'app-display-table',
  templateUrl: './display-table.component.html',
  styleUrls: ['./display-table.component.css']
})
export class DisplayTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: DisplayTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['generation', 'fragment', 'alleleFrequencyBlue', 'alleleFrequencyGreen', 'alleleFrequencyMagenta'];

  ngOnInit() {
    this.dataSource = new DisplayTableDataSource(this.paginator, this.sort);
  }
}
