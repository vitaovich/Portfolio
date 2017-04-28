import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }  from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { ProjectService } from './project.service';
import { Project } from './project';

@Component({
  selector: 'project-detail',
  templateUrl: './project-detail.component.html',
  // styleUrls: [ './hero-detail.component.css' ]
})

export class ProjectDetailComponent implements OnInit {
  @Input() project: Project;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.projectService.getProject(params['id']))
      .subscribe(project => this.project = project);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
  this.projectService.update(this.project)
    .then(() => this.goBack());
  }
}
