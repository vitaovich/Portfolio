import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { ProjectsComponent }   from './projects/projects.component';
import { ProjectDetailComponent }   from './projects/project-detail.component';
import { ProjectFormComponent }   from './projects/project-form.component';
import { ProjectFormEditComponent }   from './projects/project-form-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'projects',  component: ProjectsComponent },
  { path: 'projects/:id',  component: ProjectDetailComponent },
  { path: 'projects/edit/:id',  component: ProjectFormEditComponent },
  { path: 'project/create',  component: ProjectFormComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
