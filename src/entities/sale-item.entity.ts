import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { InventoryItemEntity } from './inventory-items.entity';
import { TransactionEntity } from './transaction.entity';

@Entity('sale_items')
export class SaleItemEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ name: 'transaction_id', type: 'uuid' })
  transactionId: string;

  @Column({ name: 'item_id', type: 'bigint' })
  itemId: number;

  @Column({ type: 'int', default: 1 })
  quantity: number;

  @ManyToOne(
    () => TransactionEntity,
    (tr: TransactionEntity): SaleItemEntity[] => tr.saleItems,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'transaction_id' })
  transaction: TransactionEntity;

  @ManyToOne(() => InventoryItemEntity, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'item_id' })
  item: InventoryItemEntity;
}
