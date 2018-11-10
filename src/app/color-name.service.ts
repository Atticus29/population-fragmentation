import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ColorNameService {

  constructor(private http: HttpClient) { }

  getJSON(url: string){
    let result = this.http.get(url);
    return result;
  }

  extractNameFromJSON(result: any){
    // console.log(result);
    // console.log(typeof result);
  }
}
