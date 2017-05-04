import { NgModule, enableProdMode }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule }  from './app-routing.module';

// Imports for loading & configuring the in-memory web api
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent }  from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectDetailComponent } from './projects/project-detail.component';
import { ProjectFormComponent } from './projects/project-form.component';
import { ProjectService } from './projects/project.service';
import { AboutComponent } from './about/about.component';

const config = require('../app.config.js');
if (config.productionMode) {
  enableProdMode();
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    // InMemoryWebApiModule.forRoot(InMemoryDataService),
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    ProjectsComponent,
    ProjectDetailComponent,
    ProjectFormComponent,
    AboutComponent
  ],
  providers: [
    ProjectService,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
