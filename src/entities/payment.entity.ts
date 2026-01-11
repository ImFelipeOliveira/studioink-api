import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StudioEntity } from './studio.entity';
import { FinancialCategoryEntity } from './financial-category.entity';
import { TransactionEntity } from './transaction.entity';

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  CANCELED = 'canceled',
}

@Entity('payments')
export class PaymentEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: number;

  @Column({ name: 'studio_id', type: 'bigint' })
  studioId: number;

  @Column({ name: 'category_id', type: 'int' })
  categoryId: number;

  @Column({ name: 'transaction_id', type: 'bigint', nullable: true })
  transactionId: number | null;

  @Column({ name: 'amount_cents', type: 'bigint' })
  amountCents: string;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status: PaymentStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @ManyToOne(() => StudioEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'studio_id' })
  studio: StudioEntity;

  @ManyToOne(() => FinancialCategoryEntity, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'category_id' })
  category: FinancialCategoryEntity;

  @ManyToOne(() => TransactionEntity, (transaction) => transaction.payments, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'transaction_id' })
  transaction: TransactionEntity | null;
}
