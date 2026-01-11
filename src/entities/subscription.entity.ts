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
import { InvoiceEntity } from './invoice.entity';
import { StudioEntity } from './studio.entity';
import { PlanEntity } from './plan.entity';

export enum SubscriptionStatus {
  TRIALING = 'trialing',
  ACTIVE = 'active',
  PAST_DUE = 'past_due',
  CANCELED = 'canceled',
  UNPAID = 'unpaid',
}

@Entity('subscriptions')
export class SubscriptionEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ name: 'studio_id', type: 'bigint', unique: true })
  studioId: number;

  @Column({ name: 'plan_id', type: 'int' })
  planId: number;

  @Column({
    type: 'enum',
    enum: SubscriptionStatus,
    default: SubscriptionStatus.TRIALING,
  })
  status: SubscriptionStatus;

  @Column({ name: 'trial_ends_at', type: 'timestamp', nullable: true })
  trialEndsAt: Date | null;

  @Column({ name: 'current_period_start', type: 'timestamp', nullable: true })
  currentPeriodStart: Date | null;

  @Column({ name: 'current_period_end', type: 'timestamp', nullable: true })
  currentPeriodEnd: Date | null;

  @Column({ name: 'canceled_at', type: 'timestamp', nullable: true })
  canceledAt: Date | null;

  @Column({
    name: 'gateway_provider',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  gatewayProvider: string | null;

  @Column({
    name: 'gateway_subscription_id',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  gatewaySubscriptionId: string | null;

  @CreateDateColumn({ name: 'created_at', nullable: true, update: true })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @ManyToOne(() => StudioEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'studio_id' })
  studio: StudioEntity;

  @ManyToOne(() => PlanEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'plan_id' })
  plan: PlanEntity;

  @OneToMany(() => InvoiceEntity, (invoice) => invoice.subscription)
  invoices: InvoiceEntity[];
}
