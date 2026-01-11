import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  Unique,
} from 'typeorm';
import { StudioEntity } from './studio.entity';

export enum FinancialCategoryType {
  REVENUE = 'revenue',
  EXPENSE = 'expense',
}

@Entity('financial_categories')
@Unique(['slug', 'studioId'])
export class FinancialCategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'studio_id', type: 'bigint', nullable: true })
  studioId: number | null;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  slug: string | null;

  @Column({ type: 'enum', enum: FinancialCategoryType })
  type: FinancialCategoryType;

  @Column({ name: 'is_system_default', type: 'boolean', default: false })
  isSystemDefault: boolean;

  @ManyToOne(() => StudioEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'studio_id' })
  studio: StudioEntity | null;
}
