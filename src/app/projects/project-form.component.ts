import { Component, Input, OnChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { Project, Content, ImageForm }    from './project';
import { AppInfoService } from '../app-info.service';
import { ProjectService } from './project.service';

@Component({
  selector: 'project-form',
  templateUrl: './project-form.component-v2.html'
})
export class ProjectFormComponent implements OnChanges {
  @Input() project: Project = new Project(2, '', new ImageForm(), []);
  newProject: Project = new Project(0, '', new ImageForm(), []);
  projectForm: FormGroup;
  submitted = false;

  constructor( private fb: FormBuilder, private appinfo: AppInfoService, private projectService: ProjectService ) {
     this.createForm();
   }

   addContentText() {
     this.contents.push(this.fb.group(new Content( 'text' )));
   }
   addContentImage() {
     this.contents.push(this.fb.group(new Content( 'image', new ImageForm())));
   }

   removeContent(index: number) {
     this.contents.removeAt(index);
   }

  createForm() {
    this.projectForm = this.fb.group({
      title: '',
      icon: this.fb.group(new ImageForm()),
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

        let img  = new ImageForm(file.name, reader.result);
        imgFormGroup.setValue(img);
      };
      reader.readAsDataURL(file);
    } else {
      imgFormGroup.setValue(new ImageForm('', ''));
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
    this.projectService.update(this.project);
    this.ngOnChanges();
  }

  prepareSaveProject(): Project {
    const formModel = this.projectForm.value;

    const contentsDeepCopy: Content[] = formModel.contents.map(
      (content: Content) => Object.assign({}, content)
    );

    const saveProject: Project = {
      id: this.project.id,
      title: formModel.title as string,
      icon: formModel.icon as ImageForm,
      contents: contentsDeepCopy
    };
    return saveProject;
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.project); }
  get newDiagnostic() { return JSON.stringify(this.newProject); }
}
