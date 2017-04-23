export class Project {
  constructor(
    public id: number,
    public title: string,
    public contents: Content[]
  ){}
}

export class Content  {
  constructor(
    public order: number,
    public type: string,
    public details?: string
  ){
  }
 }
