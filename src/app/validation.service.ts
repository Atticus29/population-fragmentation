import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  validateUrl(url: string): boolean{
    // let re = /^https:\/\/*?.*?.*?$/;
    let re = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    return re.test(url.toLowerCase());
  }

  hasTwoOrMoreCharacters(name: string): boolean{
    let re = /^[A-Za-z]+$/;
    return (re.test(name) && name.length >= 2);
    // return name.length >= 2;
  }
}
