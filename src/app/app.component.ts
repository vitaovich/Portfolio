import { Component } from '@angular/core';

import { LoggerService } from './logger.service';
import { AppInfoService } from './app-info.service';

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
      <button type="button"
                    class="btn {{appinfo.isOn ? 'btn-success' : 'btn-danger'}}"
                    (click)="appinfo.setInfoOn();">
                    More Info: {{appinfo.isOn ? 'On' : 'Off'}}
      </button>
    </nav>
    <router-outlet></router-outlet>
  `,
  providers: [ LoggerService, AppInfoService ]
})
export class AppComponent  {
  name = 'Vitaliy\'s site.';

  constructor(
    private logger: LoggerService,
    private appinfo: AppInfoService
  ) {
    logger.logInfo('AppComponent initialized.');
  }
}
