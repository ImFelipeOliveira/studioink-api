import { Controller, Get, HttpCode, HttpStatus, Inject } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PlanEntity } from '../entities/plan.entity';
import { DATA_SOURCE } from '../database/database.provider';
import { PlansResponseDTO } from './DTO/plans.DTO';

@Controller('plans')
export class PlansController {
  private repository: Repository<PlanEntity>;
  constructor(@Inject(DATA_SOURCE) private database: DataSource) {
    this.repository = this.database.getRepository(PlanEntity);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<PlansResponseDTO[]> {
    const plans: PlanEntity[] = await this.repository.find({
      where: { isActive: true },
    });
    return plans.map((plan) => new PlansResponseDTO(plan));
  }
}
