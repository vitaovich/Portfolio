import { platformBrowser }    from '@angular/platform-browser';
import { AppModuleNgFactory } from '../out/src/app/app.module.ngfactory';

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
