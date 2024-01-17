export interface CampaignInput {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  budget: number;
}

export class Campaign {

  constructor(
    public id: number,
    public name: string,
    public startDate: number,
    public endDate: number,
    public budget: number,
    public active: boolean,
    public visible: boolean
  ) {}


  static create(campaign: CampaignInput) {
    const startDate = Date.parse(campaign.startDate);
    const endDate = Date.parse(campaign.endDate);
    return new Campaign(
      campaign.id,
      campaign.name,
      startDate,
      endDate,
      campaign.budget,
      Campaign.isActive(campaign, startDate, endDate),
      true
    );
  }

    /**
   * Check if campaign is active.
   * Campaign is active if the current date is within the date range.
   */
    private static isActive(campaign: CampaignInput, start: number, end: number): boolean {
      const current = Date.now();
      return current < end && current > start;
    }
}
