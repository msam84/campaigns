import { ChangeDetectorRef, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Campaign } from './campaign';

@Injectable()
export class CampaignsService {
  private campaigns: Array<Campaign> = [];

  private campaigns$$: BehaviorSubject<Array<Campaign>> = new BehaviorSubject<
    Array<Campaign>
  >([  ]);

  public campaigns$: Observable<Array<Campaign>> = this.campaigns$$;

  constructor() {
    (window as any)['addCampaigns'] = this.addCampaigns;
    console.warn(this)

  }

  public addCampaigns = (campaigns: Array<Object>) => {
    const parsed = JSON.parse(JSON.stringify(campaigns));
    console.error('parsed', parsed);

    this.campaigns = this.campaigns.concat(
      parsed.map((campaign: any) => {
        return Campaign.create(campaign);
      })
    );
    console.error('afer', this.campaigns);
    console.warn(this)
    this.campaigns$$.next(this.campaigns);

  }
}
