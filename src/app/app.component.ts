import { Component, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material';

import { take, takeUntil } from 'rxjs/operators';
import { Subject } from "rxjs";

import {PopulationManagerService } from './population-manager.service';

import Amplify, { API } from 'aws-amplify';
import aws_exports from '../aws-exports';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // message = '';
  rooms = [];
  loading = false;

  constructor(){}

  ngOnInit() {
    Amplify.configure(aws_exports);
    // console.log('Amplify Initialised');
    // this.message = "Amplify Initialised";
    this.loading = true;
    API.get('sampleCloudApi', '/items', {}).then(data =>{
      this.loading = false;
      this.rooms = data;
    });

  }
}
