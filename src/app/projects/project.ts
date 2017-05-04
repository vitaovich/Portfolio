export class Project {
  constructor(
    public title?: string,
    public icon?: Content,
    public description?: string,
    public contents?: Content[],
    public _id?: string,
  ) { }
}

export class Content  {
  constructor(
    public type: string,
    public details = '',
  ) {
  }
}
