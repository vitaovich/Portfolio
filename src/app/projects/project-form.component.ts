import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { Project, Content }    from './project';
import { AppInfoService } from '../app-info.service';

@Component({
  selector: 'project-form',
  templateUrl: './project-form.component-v2.html'
})
export class ProjectFormComponent {
  @Input() project: Project;

  projectForm: FormGroup;

  constructor( private fb: FormBuilder, private appinfo: AppInfoService) {
     this.createForm();
     this.project = new Project(18, 'Robot wars', []);
   }

  submitted = false;

  onSubmit() {
    this.submitted = true;
    this.project = this.prepareSaveProject();
  }

  newProject() { this.project = new Project(33, '', [] );  }

  prepareSaveProject(): Project {
    const formModel = this.projectForm.value;

    const contentsDeepCopy: Content[] = formModel.contents.map(
      (content: Content) => Object.assign({}, content)
    );

    const saveProject: Project = {
      id: this.project.id,
      title: formModel.title as string,
      contents: contentsDeepCopy
    };
    return saveProject;
  }



  createForm() {
    this.projectForm = this.fb.group({
      title: 'title',
      contents: this.fb.array([]),
    });
  }

  get contents(): FormArray {
    return this.projectForm.get('contents') as FormArray;
  };

  addContentText() {
    this.contents.push(this.fb.group(new Content(2,"text")))
  }
  addContentImage() {
    this.contents.push(this.fb.group(new Content(1,"image")))
  }

  pictureAdded(event: any, id: number, imgControl: FormControl) {
    let files = event.srcElement.files as FileList;
    console.log(files);
    let file = files[0] as File;
    
    imgControl.setValue(file.name);
    let reader = new FileReader();
    reader.onload = (e) => {
      let loadedReader = e.target as FileReader;
      let imgElement = document.getElementById("img_preview_" + id) as HTMLImageElement;
      imgElement.src = loadedReader.result;
    }
    reader.readAsDataURL(file);
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.project); }
}
