import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Project } from './project';
import { ProjectService } from './project.service';

@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
})


export class ProjectsComponent {
  projects: Project[];

  constructor(
    private projectService: ProjectService,
    private router: Router
  ) { }

  getProjects(): void {
    this.projectService.getProjects().then(projects => this.projects = projects );
  }

  ngOnInit(): void {
    this.getProjects();
  }
}
