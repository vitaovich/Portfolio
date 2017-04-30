import { Component, Input, OnChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import 'rxjs/add/operator/switchMap';

import { Project, Content }    from './project';
import { AppInfoService } from '../app-info.service';
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
    private appinfo: AppInfoService,
    private projectService: ProjectService ) {
     this.createForm();
   }

   addContent() {
     this.contents.push(this.fb.group(new Content( )));
   }

   removeContent(index: number) {
     this.contents.removeAt(index);
   }

  createForm() {
    this.projectForm = this.fb.group({
      title: '',
      icon: this.fb.group(new Content()),
      contents: this.fb.array([]),
    });
  }

 get contents(): FormArray {
    return this.projectForm.get('contents') as FormArray;
  };

 get icon(): FormGroup {
    return this.projectForm.get('icon') as FormGroup;
  };

  pictureAdded(event: any, id: number, imgFormGroup: FormGroup) {
    let files = event.srcElement.files as FileList;
    if (files.length === 1) {
      let file = files[0] as File;
      let reader = new FileReader();
      reader.onload = (e) => {
        reader = e.target as FileReader;
        let imgElement = document.getElementById('img_preview_' + id) as HTMLImageElement;
        imgElement.src = reader.result;

        let img  = new Content('', file.name, reader.result, imgFormGroup.get('details').value);
        imgFormGroup.setValue(img);
      };
      reader.readAsDataURL(file);
    } else {
      let imgElement = document.getElementById('img_preview_' + id) as HTMLImageElement;
      imgElement.src = '';
    }
  }

  saveChanges() {
    this.submitted = true;
    this.newProject = this.prepareSaveProject();
  }



  ngOnChanges() {
      // TODO: implement this
      console.log(this.project);
      this.projectForm.reset({
        title: this.project.title,
        icon: this.fb.group(this.project.icon)
      });
      const contentsFGs = this.project.contents.map( content => this.fb.group(content));
      const contentsFormArray = this.fb.array(contentsFGs);
      this.projectForm.setControl('contents', contentsFormArray);
  }

  revert() { this.ngOnChanges(); }

  onSubmit() {
    console.log('submitted changes');
    this.submitted = true;
    this.project = this.newProject;
    this.projectService.create(this.newProject).then(projects => console.log(projects) );
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
