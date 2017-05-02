import { Component, Input, OnChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import 'rxjs/add/operator/switchMap';

import { Project, Content }    from './project';
import { ProjectService } from './project.service';

@Component({
  selector: 'project-form',
  templateUrl: './project-form.component.html'
})
export class ProjectFormComponent implements OnChanges {
  @Input() project: Project = new Project();
  newProject: Project;
  projectForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService ) {
     this.createForm();
   }

   addContent(type: string) {
     this.contents.push(this.fb.group(new Content(type )));
   }

   removeContent(index: number) {
     this.contents.removeAt(index);
   }

  createForm() {
    this.projectForm = this.fb.group({
      title: '',
      icon: this.fb.group(new Content('img')),
      contents: this.fb.array([]),
    });
  }

 get contents(): FormArray {
    return this.projectForm.get('contents') as FormArray;
  };

 get icon(): FormGroup {
    return this.projectForm.get('icon') as FormGroup;
  };

  saveChanges() {
    this.submitted = true;
    this.newProject = this.prepareSaveProject();
  }

  ngOnChanges() {
      console.log(this.project);
      this.projectForm.reset({
        title: this.project.title,
      });
      this.projectForm.setControl('icon', this.fb.group(this.project.icon));
      const contentsFGs = this.project.contents.map( content => this.fb.group(content));
      const contentsFormArray = this.fb.array(contentsFGs);
      this.projectForm.setControl('contents', contentsFormArray);
  }

  revert() { this.ngOnChanges(); }

  onSubmit() {
    console.log('submitted changes');
    this.submitted = true;
    this.project = this.newProject;
    if (this.project._id != null) {
      this.projectService.update(this.project).then(projects => console.log(projects));
    } else {
      this.projectService.create(this.newProject).then(projects => console.log(projects) );
    }
  }

  prepareSaveProject(): Project {
    const formModel = this.projectForm.value;

    const contentsDeepCopy: Content[] = formModel.contents.map(
      (content: Content) => Object.assign({}, content)
    );

    const saveProject: Project = {
      _id: this.project._id,
      title: formModel.title as string,
      icon: formModel.icon as Content,
      contents: contentsDeepCopy
    };
    return saveProject;
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.project); }
  get newDiagnostic() { return JSON.stringify(this.newProject); }
}
