import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';

import { map, takeUntil } from 'rxjs/operators';
import { Observable, of as observableOf, merge, Subject } from 'rxjs';

import { PopulationManagerService } from '../population-manager.service';
import { IndividualGenerationService } from '../individual-generation.service';

export interface DisplayTableItem {
  generation: number;
  fragment: number;
  fragmentPopSize: number;
  cyanCount: number;
  greenCount: number;
  magentaCount: number;
}

// TODO: replace this with real data from your application
//TODO fix
let frequencyData: DisplayTableItem[] = [];
let ngUnsubscribe: Subject<void> = new Subject<void>();
let popManagerInstance = new PopulationManagerService(new IndividualGenerationService());
// popManagerInstance.currentMetaPopulation.subscribe(metapopulation =>{
//   console.log("hi mark");
//   console.log(metapopulation);
// });
// popManagerInstance.calculateAlleleFrequency("cyan", false).subscribe(result => {
//   console.log(result);
//   //TODO update this somehow
// });
frequencyData = [
  // {generation: 12, fragment: 2, fragmentPopSize: 4, cyanCount: 3, greenCount: 5,magentaCount: 0},
  // {generation: 13, fragment: 2, fragmentPopSize: 4, cyanCount: 2, greenCount: 4,magentaCount: 2}
];

/**
 * Data source for the DisplayTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DisplayTableDataSource extends DataSource<DisplayTableItem> {
  data: DisplayTableItem[] = frequencyData;


  constructor(private paginator: MatPaginator, private sort: MatSort, private popManager: PopulationManagerService) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<DisplayTableItem[]> {
    this.resetDataTableData();
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginators length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  resetDataTableData(){
    this.data = [];
    this.popManager.metapopulationGenerations.subscribe(results =>{
      for (let i = 0; i<results.length; i++){
        for(let j = 0; j<results[i].getSubpopulations().length; j++){
          let currentSubpop = results[i].getSubpopulations()[j];
          let currentIndividuals = currentSubpop.getIndividuals();
          let currentcyanCount = this.popManager.getAlleleCount("cyan", currentIndividuals);
          let currentGreenCount = this.popManager.getAlleleCount("green", currentIndividuals);
          let currentMagentaCount = this.popManager.getAlleleCount("magenta", currentIndividuals);
          // console.log(currentcyanCount);
          // console.log(currentGreenCount);
          // console.log(currentMagentaCount);
          // console.log(this.data);
          this.data.push({generation: i+1, fragment: j+1, fragmentPopSize: currentIndividuals.length, cyanCount: currentcyanCount, greenCount: currentGreenCount, magentaCount: currentMagentaCount});
          // console.log(this.data);
        }
      }
    });
  };

  getAllGenerationData(data: DisplayTableItem[]){
    return Observable.create(obs => {
      let popManagerInstance = new PopulationManagerService(new IndividualGenerationService());
      popManagerInstance.metapopulationGenerations.subscribe(results =>{
        // console.log("results!");
        // console.log(results);
        data.push({generation: 0, fragment: 1,fragmentPopSize: 10 , cyanCount: 5, greenCount: 0.77, magentaCount: 0.78});
        obs.next(data);
      });
    });
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: DisplayTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: DisplayTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'generation': return compare(a.generation, b.generation, isAsc);
        case 'fragment': return compare(+a.fragment, +b.fragment, isAsc);
        case 'fragmentPopSize': return compare(+a.fragmentPopSize, +b.fragmentPopSize, isAsc);
        case 'cyanCount': return compare(+a.cyanCount, +b.cyanCount, isAsc);
        case 'greenCount': return compare(+a.greenCount, +b.greenCount, isAsc);
        case 'magentaCount': return compare(+a.magentaCount, +b.magentaCount, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
