export class Project {
  constructor(
    public id: number,
    public title: string,
    public icon: Image,
    public contents: Content[]
  ) { }
}

export class Content  {
  constructor(
    public controlType: string,
    public details?: any
  ) {
    this.details = details || '';
  }
}

export class ImageFile implements Image {
  name: string;
  src: string;
  constructor(
    public imageName?: string,
    public source?: string
  ) {
    this.name = imageName;
    this.src = source;
  }
 }

export class ImageForm implements Image {
  name: string;
  src: string;
  constructor(
    public imageName?: string,
    public source?: string
  ) {
    this.name = imageName || '';
    this.src = source || '';
  }
 }

 interface Image {
   name: string;
   src: string;
 }
