import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import promiseFinally from 'promise.prototype.finally';

if (environment.production) {
  enableProdMode();
}

promiseFinally.shim();

const bootstrapPromise =  platformBrowserDynamic().bootstrapModule(AppModule);

//Logging bootstrap information
bootstrapPromise.then(success => console.log(`Bootstrap success`))
  .catch(err => console.error(err));
