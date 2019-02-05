import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from "@angular/core";
import { InstructorConfigureComponent } from './instructor-configure/instructor-configure.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  { path: 'instructor-config', component: InstructorConfigureComponent },
  { path: '', component: LandingComponent }
];

export const routingModule: ModuleWithProviders = RouterModule.forRoot(routes);
