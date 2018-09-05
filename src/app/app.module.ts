import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { FormDisplayComponent } from './form-display/form-display.component';
import { OrganismDisplayComponent } from './organism-display/organism-display.component';
import { PopulationDetailsFormComponent } from './population-details-form/population-details-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LizardDisplayComponent } from './lizard-display/lizard-display.component';
import { DrawingService } from './drawing.service';
import { HttpClientModule } from '@angular/common/http';
import { ColorNameService } from './color-name.service';
import { PopulationGenerationService } from './population-generation.service';

@NgModule({
  declarations: [
    AppComponent,
    FormDisplayComponent,
    OrganismDisplayComponent,
    PopulationDetailsFormComponent,
    LizardDisplayComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule
  ],
  providers: [DrawingService, ColorNameService, PopulationGenerationService],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
