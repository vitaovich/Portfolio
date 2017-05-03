import { Component, OnInit } from '@angular/core';

import { ProjectsComponent } from '../projects/projects.component';
import { ProjectDetailComponent } from '../projects/project-detail.component';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
 }
