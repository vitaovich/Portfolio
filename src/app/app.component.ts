import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `

    <nav>
      <span>{{ name }}</span>
      <a routerLink="/dashboard">Dashboard</a>
      <a routerLink="/projects">Projects</a>
      <a routerLink="/dashboard">Resume</a>
      <a href="https://github.com/vitaovich">Github</a>
      <a href="https://www.linkedin.com/in/vitaliy-alekhnovich">LinkedIn</a>
    </nav>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent  {
  name = 'Vitaliy\'s site.';
}
