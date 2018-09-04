import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormDisplayComponent } from './form-display/form-display.component';
import { OrganismDisplayComponent } from './organism-display/organism-display.component';
import { PopulationDetailsFormComponent } from './population-details-form/population-details-form.component';

@NgModule({
  declarations: [
    AppComponent,
    FormDisplayComponent,
    OrganismDisplayComponent,
    PopulationDetailsFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
