import { PlanEntity } from '../../entities/plan.entity';

export class PlansResponseDTO {
  public id: number;
  public name: string;
  public slug: string;
  public description: string | null;
  public price_monthly: number;
  public price_yearly: number;
  public features: string;
  public is_active: boolean;
  public created_at: Date;
  public updated_at: Date | null;
  constructor(plan: PlanEntity) {
    this.id = plan.id;
    this.name = plan.name;
    this.slug = plan.slug;
    this.description = plan.description;
    this.price_monthly = Number(plan.priceMonthlyCents);
    this.price_yearly = Number(plan.priceYearlyCents);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.features = JSON.parse(plan.features);
    this.is_active = plan.isActive;
    this.created_at = plan.createdAt;
    this.updated_at = plan.updatedAt;
  }
}
