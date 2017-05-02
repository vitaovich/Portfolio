export class Project {
  constructor(
    public title?: string,
    public icon?: Content,
    public contents?: Content[],
    public _id?: number,
  ) { }
}

export class Content  {
  constructor(
    public type: string,
    public details = '',
  ) {
  }
}
