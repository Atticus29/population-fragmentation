import { Injectable } from '@angular/core';

import { Subject, BehaviorSubject, Observable, combineLatest, of } from 'rxjs';

import { masterConfigProperties } from './masterConfiguration';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  private configurationVarsSource: BehaviorSubject<String[]> = new BehaviorSubject ([]);
  configurationVars = this.configurationVarsSource.asObservable();

  constructor() {
    this.configurationVarsSource.next([masterConfigProperties.googleSheetUrl, masterConfigProperties.googleSheetUrl]);
  }

  emitNewConfigVars(newVars: String[]){
    this.configurationVarsSource.next(newVars);
  }
}
