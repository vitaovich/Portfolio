import { Component } from '@angular/core';

import { LoggerService } from './logger.service';
import { AppInfoService } from './app-info.service';

@Component({
  selector: 'my-app',
  templateUrl: `./app.component.html`,
  styleUrls: ['./app.component.css'],
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
