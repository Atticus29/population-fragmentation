import { Component, OnInit } from '@angular/core';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import { FormControl, Validators } from '@angular/forms';
import {MatIcon} from '@angular/material/icon';


@Component({
  selector: 'app-population-details-form',
  templateUrl: './population-details-form.component.html',
  styleUrls: ['./population-details-form.component.css'],
})
export class PopulationDetailsFormComponent implements OnInit {
  //TODO fix the form (which is displaying the input terribly!)
  private popsize = new FormControl('',[Validators.required, Validators.min(2)]);
  constructor() { }

  ngOnInit() {
  }

  getErrorMessage() {
    return this.popsize.hasError('required') ? 'You must enter a value' :
        this.popsize.hasError('small') ? 'Number too small' :
            '';
  }

}
