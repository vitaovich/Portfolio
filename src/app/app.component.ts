import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<h1>Hello {{name}}. Success is coming your way!</h1>`,
})
export class AppComponent  { name = 'Angular'; }
