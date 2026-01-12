import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('plans')
export class PlanEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100, unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ name: 'price_monthly_cents', type: 'bigint' })
  priceMonthlyCents: number;

  @Column({ name: 'price_yearly_cents', type: 'bigint' })
  priceYearlyCents: number;

  @Column({ type: 'json' })
  features: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at', nullable: true, update: true })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', update: true, nullable: true })
  updatedAt: Date | null;
}
