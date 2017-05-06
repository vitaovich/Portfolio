import { Component } from '@angular/core';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'my-app',
  templateUrl: `./app.component.html`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent  {
  name = 'Vitaliy\'s site.';

    public constructor(private titleService: Title ) {
      this.titleService.setTitle('Vitaliy\'s Portfolio');
     }
}
