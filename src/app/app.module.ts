import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormDisplayComponent } from './form-display/form-display.component';
import { OrganismDisplayComponent } from './organism-display/organism-display.component';

@NgModule({
  declarations: [
    AppComponent,
    FormDisplayComponent,
    OrganismDisplayComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
