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
import { SessionMaterialEntity } from './session-material.entity';
import { InventoryItemEntity } from './inventory-items.entity';
import { PaymentEntity } from './payment.entity';

@Entity('inventory_batches')
export class InventoryBatchEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ name: 'item_id', type: 'bigint' })
  itemId: number;

  @Column({ name: 'payment_id', type: 'bigint', nullable: true })
  paymentId: number | null;

  @Column({ name: 'batch_number', type: 'varchar', length: 100, nullable: true })
  batchNumber: string | null;

  @Column({ name: 'expiration_date', type: 'date', nullable: true })
  expirationDate: Date | null;

  @Column({ name: 'quantity_initial', type: 'int', nullable: true })
  quantityInitial: number | null;

  @Column({ name: 'quantity_current', type: 'int', nullable: true })
  quantityCurrent: number | null;

  @Column({ name: 'purchase_date', type: 'date', nullable: true })
  purchaseDate: Date | null;

  @Column({ name: 'unit_cost', type: 'int', nullable: true })
  unitCost: number | null;

  @CreateDateColumn({ name: 'created_at', nullable: true, update: true })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @ManyToOne(() => InventoryItemEntity, (item) => item.batches, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'item_id' })
  item: InventoryItemEntity;

  @ManyToOne(() => PaymentEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'payment_id' })
  payment: PaymentEntity | null;

  @OneToMany(() => SessionMaterialEntity, (material) => material.batch)
  sessionMaterials: SessionMaterialEntity[];
}
