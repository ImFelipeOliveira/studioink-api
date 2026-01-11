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
import { ReceivableEntity } from './receivable.entity';
import { PaymentEntity } from './payment.entity';

export enum TransactionTypeEnum {
  CREDIT = 'credit',
  DEBIT = 'debit',
}

@Entity('transactions')
export class TransactionEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: number;

  @Column({ name: 'studio_id', type: 'bigint' })
  studioId: number;

  @Column({ type: 'enum', enum: TransactionTypeEnum })
  type: TransactionTypeEnum;

  @Column({ name: 'amount_cents', type: 'bigint' })
  amountCents: string;

  @Column({ name: 'balance_after_cents', type: 'bigint', nullable: true })
  balanceAfterCents: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @ManyToOne(() => StudioEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'studio_id' })
  studio: StudioEntity;

  @OneToMany(() => ReceivableEntity, (receivable) => receivable.transaction)
  receivables: ReceivableEntity[];

  @OneToMany(() => PaymentEntity, (payment) => payment.transaction)
  payments: PaymentEntity[];
}
