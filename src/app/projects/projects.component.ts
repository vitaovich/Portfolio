import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Project } from './project';
import { ProjectService } from './project.service';

@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  styleUrls: [ './projects.component.css' ],
})


export class ProjectsComponent {
  projects: Project[];
  selectedProject: Project;

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

  onSelect(project: Project): void {
    this.selectedProject = project;
  }

  gotoDetail(): void {
    this.router.navigate(['/projects', this.selectedProject._id]);
  }

  clearSelected(): void {
    this.selectedProject = null;
  }

  delete(project: Project): void {
  this.projectService
      .delete(project._id)
      .then(() => {
        this.projects = this.projects.filter(p => p !== project);
        if (this.selectedProject === project) { this.selectedProject = null; }
      });
    }
}
