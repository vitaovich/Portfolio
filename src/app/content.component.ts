import { Component } from '@angular/core';

import { AppInfoService } from './app-info.service';
 import { LoggerService } from './logger.service';

@Component({
   selector: 'tag-name',
   templateUrl: './ClassName.component.html',
   styleUrls: [
    './ClassName.component.css',
  ],
})


export class ContentComponent  {
   // properties
   // end properties

   constructor(
     private logger: LoggerService,
     private appinfo: AppInfoService
   ) {
     logger.logInfo('ContentComponent created.');
      }
 }
