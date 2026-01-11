import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ReceivableEntity } from './receivable.entity';
import { InventoryItemEntity } from './inventory-items.entity';

@Entity('sale_items')
export class SaleItemEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ name: 'receivable_id', type: 'uuid' })
  receivableId: string;

  @Column({ name: 'item_id', type: 'bigint' })
  itemId: number;

  @Column({ type: 'int', default: 1 })
  quantity: number;

  @ManyToOne(() => ReceivableEntity, (receivable) => receivable.saleItems, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'receivable_id' })
  receivable: ReceivableEntity;

  @ManyToOne(() => InventoryItemEntity, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'item_id' })
  item: InventoryItemEntity;
}
