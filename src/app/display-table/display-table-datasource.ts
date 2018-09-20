import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { PopulationManagerService } from '../population-manager.service';

export interface DisplayTableItem {
  generation: number;
  fragment: number;
  alleleFrequencyBlue: number;
  alleleFrequencyGreen: number;
  alleleFrequencyMagenta: number;
}

// TODO: replace this with real data from your application
let frequencyData: DisplayTableItem[] = [];
let popManagerInstance = new PopulationManagerService();
popManagerInstance.calculateAlleleFrequency("blue", false).subscribe(result => {
  console.log(result);
  frequencyData.push({generation: 0, fragment: 1, alleleFrequencyBlue: result, alleleFrequencyGreen: 0.77, alleleFrequencyMagenta: 0.78});
});
// const frequencyData: DisplayTableItem[] = [
//   {id: 1, name: 'Hydrogen'},
//   {id: 2, name: 'Helium'},
// ];

/**
 * Data source for the DisplayTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DisplayTableDataSource extends DataSource<DisplayTableItem> {
  data: DisplayTableItem[] = frequencyData;

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<DisplayTableItem[]> {
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
        case 'alleleFrequencyBlue': return compare(+a.alleleFrequencyBlue, +b.alleleFrequencyBlue, isAsc);
        case 'alleleFrequencyGreen': return compare(+a.alleleFrequencyGreen, +b.alleleFrequencyGreen, isAsc);
        case 'alleleFrequencyMagenta': return compare(+a.alleleFrequencyMagenta, +b.alleleFrequencyMagenta, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
