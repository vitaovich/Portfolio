export class Project {
  constructor(
    public _id?: number,
    public title?: string,
    public icon?: Content,
    public contents?: Content[]
  ) { }
}

export class Content  {
  constructor(
    public id?: string,
    public name?: string,
    public src?: string,
    public details?: string
  ) {
  }
}
