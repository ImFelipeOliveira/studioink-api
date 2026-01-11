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
import { AppointmentEntity } from './appointment.entity';
import { CustomerEntity } from './customer.entity';
import { TransactionEntity } from './transaction.entity';
import { PaymentMethod } from './Enum/payment-method.enum';
import { ReceivableStatus } from './Enum/receivable-status.enum';
import { SaleItemEntity } from './sale-item.entity';

@Entity('receivables')
export class ReceivableEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'studio_id', type: 'bigint' })
  studioId: number;

  @Column({ name: 'appointment_id', type: 'bigint', nullable: true })
  appointmentId: number | null;

  @Column({ name: 'client_id', type: 'bigint', nullable: true })
  clientId: number | null;

  @Column({ name: 'transaction_id', type: 'bigint', nullable: true })
  transactionId: number | null;

  @Column({ name: 'installment_number', type: 'int', default: 1 })
  installmentNumber: number;

  @Column({ name: 'total_installments', type: 'int', default: 1 })
  totalInstallments: number;

  @Column({ name: 'amount_cents', type: 'bigint' })
  amountCents: string;

  @Column({ name: 'net_amount_cents', type: 'bigint', nullable: true })
  netAmountCents: string | null;

  @Column({ name: 'due_date', type: 'date' })
  dueDate: Date;

  @Column({ name: 'paid_at', type: 'timestamp', nullable: true })
  paidAt: Date | null;

  @Column({
    name: 'payment_method',
    type: 'enum',
    enum: PaymentMethod,
    nullable: true,
  })
  paymentMethod: PaymentMethod | null;

  @Column({
    type: 'enum',
    enum: ReceivableStatus,
    default: ReceivableStatus.PENDING,
  })
  status: ReceivableStatus;

  @Column({ name: 'description', type: 'varchar', length: 255, nullable: true })
  description: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @ManyToOne(() => StudioEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'studio_id' })
  studio: StudioEntity;

  @ManyToOne(() => AppointmentEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'appointment_id' })
  appointment: AppointmentEntity | null;

  @ManyToOne(() => CustomerEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'client_id' })
  client: CustomerEntity | null;

  @ManyToOne(
    () => TransactionEntity,
    (transaction) => transaction.receivables,
    {
      nullable: true,
      onDelete: 'SET NULL',
    },
  )
  @JoinColumn({ name: 'transaction_id' })
  transaction: TransactionEntity | null;

  @OneToMany(() => SaleItemEntity, (item) => item.receivable)
  saleItems: SaleItemEntity[];
}
