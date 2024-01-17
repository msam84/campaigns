import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { CampaignsService } from './app/campaigns.service';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule).then(ref => {
  (window as any)['ngRef'] = ref
})
  .catch(err => console.error(err));


  export const ServiceRef = {
    CampaignsService
  }
