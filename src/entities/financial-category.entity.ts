import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { StudioEntity } from './studio.entity';
import { FinancialCategoryType } from './Enum/financial-category.enum';

@Entity('financial_categories')
export class FinancialCategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'studio_id', type: 'bigint', nullable: true })
  studioId: number | null;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'enum', enum: FinancialCategoryType })
  type: FinancialCategoryType;

  @Column({ name: 'is_system_default', type: 'boolean', default: false })
  isSystemDefault: boolean;

  @ManyToOne(() => StudioEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'studio_id' })
  studio: StudioEntity | null;
}
