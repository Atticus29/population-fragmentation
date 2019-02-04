import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from "@angular/core";
import { InstructorConfigureComponent } from './instructor-configure/instructor-configure.component';

const routes: Routes = [
  { path: 'instructor-config', component: InstructorConfigureComponent }
];

export const routingModule: ModuleWithProviders = RouterModule.forRoot(routes);
