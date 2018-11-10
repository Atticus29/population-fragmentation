import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { PopulationDetailsFormComponent } from './population-details-form/population-details-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LizardDisplayComponent } from './lizard-display/lizard-display.component';
import { DrawingService } from './drawing.service';
import { HttpClientModule } from '@angular/common/http';
import { ColorNameService } from './color-name.service';
import { IndividualGenerationService } from './individual-generation.service';
import { PopulationManagerService } from './population-manager.service';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import { QuestionsComponent } from './questions/questions.component';
import { DiceComponent } from './dice/dice.component';
import { PaymentComponent } from './payment/payment.component';
import { FocusDirective } from './focus.directive';
import { DisplayTableComponent } from './display-table/display-table.component';
import { MatedDirective } from './mated.directive';
import { MatingsDisplayComponent } from './matings-display/matings-display.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { ProblemDisplayComponent } from './problem-display/problem-display.component';
import { GenerationDisplayComponent } from './generation-display/generation-display.component';
import { MatedSnackbarComponent } from './mated-snackbar/mated-snackbar.component';
import { ObjectivesComponent } from './objectives/objectives.component';
import { VocabularyComponent } from './vocabulary/vocabulary.component';
import { InstructionsComponent } from './instructions/instructions.component';

@NgModule({
  declarations: [
    AppComponent,
    PopulationDetailsFormComponent,
    LizardDisplayComponent,
    QuestionsComponent,
    DiceComponent,
    PaymentComponent,
    FocusDirective,
    DisplayTableComponent,
    MatedDirective,
    MatingsDisplayComponent,
    IntroductionComponent,
    ProblemDisplayComponent,
    GenerationDisplayComponent,
    MatedSnackbarComponent,
    ObjectivesComponent,
    VocabularyComponent,
    InstructionsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatStepperModule,
    MatRadioModule,
    MatSnackBarModule
  ],
  providers: [DrawingService, ColorNameService, IndividualGenerationService, PopulationManagerService],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
