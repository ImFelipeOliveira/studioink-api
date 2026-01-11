import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StudioEntity } from './studio.entity';
import { InventoryItemEntity } from './inventory-items.entity';

@Entity('inventory_categories')
export class InventoryCategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'studio_id', type: 'bigint', nullable: true })
  studioId: number | null;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  slug: string;

  @Column({ name: 'requires_batch_control', default: false })
  requiresBatchControl: boolean;

  @Column({ name: 'is_consumable', default: true })
  isConsumable: boolean;

  @Column({ name: 'is_sellable', default: false })
  isSellable: boolean;

  @CreateDateColumn({ name: 'created_at', nullable: true, update: true })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @ManyToOne(() => StudioEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'studio_id' })
  studio: StudioEntity | null;

  @OneToMany(() => InventoryItemEntity, (item) => item.category)
  items: InventoryItemEntity[];
}
