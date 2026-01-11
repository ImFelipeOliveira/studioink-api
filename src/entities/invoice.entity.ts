import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { StudioEntity } from './studio.entity';
import { SubscriptionEntity } from './subscription.entity';
import { PaymentEntity } from './payment.entity';

export enum InvoiceStatus {
  OPEN = 'open',
  PAID = 'paid',
  FAILED = 'failed',
  VOID = 'void',
}

@Entity('invoices')
export class InvoiceEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ name: 'studio_id', type: 'bigint' })
  studioId: number;

  @Column({ name: 'subscription_id', type: 'bigint' })
  subscriptionId: number;

  @Column({ name: 'amount_cents', type: 'bigint' })
  amountCents: string;

  @Column({
    type: 'enum',
    enum: InvoiceStatus,
    default: InvoiceStatus.OPEN,
  })
  status: InvoiceStatus;

  @Column({ name: 'paid_at', type: 'timestamp', nullable: true })
  paidAt: Date | null;

  @Column({
    name: 'gateway_invoice_id',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  gatewayInvoiceId: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @ManyToOne(() => StudioEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'studio_id' })
  studio: StudioEntity;

  @ManyToOne(
    () => SubscriptionEntity,
    (sub: SubscriptionEntity): InvoiceEntity[] => sub.invoices,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'subscription_id' })
  subscription: SubscriptionEntity;

  @OneToMany(() => PaymentEntity, (payment) => payment.invoice)
  payments: PaymentEntity[];
}
