import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CampaignsService } from '../campaigns.service';
import { Campaign } from '../campaign';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css'],
})
export class CampaignListComponent implements OnInit, OnDestroy {

  private campaigns: Array<Campaign> = [];

  private _filter = ""

  @Input() set filter(searchString: string) {
    this._filter = searchString.toLowerCase();
    this.campaigns.map((campaign: Campaign) => campaign.visible = campaign.name.toLowerCase().includes(this._filter));
    this.campaigns$.next(this.campaigns)
  }

  @Input() set startDate(date: number) {
    this.campaigns.map((campaign: Campaign) => campaign.visible = campaign.startDate > date);
    this.campaigns$.next(this.campaigns)
  }

  @Input() set endDate(date: number) {
    this.campaigns.map((campaign: Campaign) => campaign.visible = campaign.endDate < date);
    this.campaigns$.next(this.campaigns)
  }

  public campaigns$ = new BehaviorSubject<Array<Campaign>>([])
  private subscriptions = new Subscription();

  constructor(public readonly campaignsService: CampaignsService,
    private readonly cdr: ChangeDetectorRef) {

  }

  ngOnInit() {
   this.subscriptions.add(this.campaignsService.campaigns$.subscribe(campaigns => {
    this.campaigns = campaigns
    console.info("received",campaigns)
    this.campaigns$.next(campaigns)
    this.cdr.detectChanges()
   }));

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();

  }

  public trackCampaign(index: number, item: Campaign) {
    return item.id

  }
}
