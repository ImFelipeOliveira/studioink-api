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
import { InventoryCategoryEntity } from './inventory-category.entity';
import { InventoryBatchEntity } from './inventory-batch.entity';

@Entity('inventory_items')
export class InventoryItemEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ name: 'category_id', type: 'int' })
  categoryId: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string | null;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: true })
  sku: string | null;

  @Column({ name: 'cached_stock_quantity', type: 'int', default: 0 })
  cachedStockQuantity: number;

  @Column({ type: 'json', nullable: true })
  attributes: any;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @ManyToOne(() => InventoryCategoryEntity, (category) => category.items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: InventoryCategoryEntity;

  @OneToMany(() => InventoryBatchEntity, (batch) => batch.item)
  batches: InventoryBatchEntity[];
}
