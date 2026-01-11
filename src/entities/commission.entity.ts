import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TransactionEntity } from './transaction.entity';
import { UserEntity } from './user.entity';
import { PaymentEntity } from './payment.entity';

export enum CommissionStatus {
  PENDING = 'pending',
  PAID = 'paid',
}

@Entity('commissions')
export class CommissionEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ name: 'transaction_id', type: 'bigint' })
  transactionId: number;

  @Column({ name: 'artist_id', type: 'bigint' })
  artistId: number;

  @Column({ name: 'payment_id', type: 'bigint', nullable: true })
  paymentId: number | null;

  @Column({ name: 'calculation_basis_cents', type: 'bigint', nullable: true })
  calculationBasisCents: string | null;

  @Column({
    name: 'percentage_applied',
    type: 'int',
  })
  percentageApplied: number | null;

  @Column({ name: 'amount_due_cents', type: 'bigint', nullable: true })
  amountDueCents: number | null;

  @Column({
    type: 'enum',
    enum: CommissionStatus,
    default: CommissionStatus.PENDING,
  })
  status: CommissionStatus;

  @Column({ name: 'paid_at', type: 'timestamp', nullable: true })
  paidAt: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @ManyToOne(() => TransactionEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'transaction_id' })
  transaction: TransactionEntity;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'artist_id' })
  artist: UserEntity;

  @ManyToOne(() => PaymentEntity, (payment) => payment.commissions, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'payment_id' })
  payment: PaymentEntity | null;
}
