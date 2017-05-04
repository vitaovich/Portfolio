import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { ProjectsComponent }   from './projects/projects.component';
import { ProjectDetailComponent }   from './projects/project-detail.component';
import { ProjectFormComponent }   from './projects/project-form.component';
import { AboutComponent }   from './about/about.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'projects',  component: ProjectsComponent },
  { path: 'projects/:id',  component: ProjectDetailComponent },
  { path: 'projects/edit/:id',  component: ProjectFormComponent },
  { path: 'project/create',  component: ProjectFormComponent },
  { path: 'about',  component: AboutComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
