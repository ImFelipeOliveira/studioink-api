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
import { CustomerEntity } from './customer.entity';
import { UserEntity } from './user.entity';

export enum AppointmentStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
  NO_SHOW = 'no_show',
}

@Entity('appointments')
export class AppointmentEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ name: 'studio_id', type: 'bigint' })
  studioId: number;

  @Column({ name: 'customer_id', type: 'bigint' })
  customerId: number;

  @Column({ name: 'artist_id', type: 'bigint' })
  artistId: number;

  @Column({ name: 'start_at', type: 'timestamp' })
  startAt: Date;

  @Column({ name: 'end_at', type: 'timestamp' })
  endAt: Date;

  @Column({
    type: 'enum',
    enum: AppointmentStatus,
    default: AppointmentStatus.PENDING,
  })
  status: AppointmentStatus;

  @Column({ name: 'quoted_price', type: 'int', nullable: true })
  quotedPrice: number | null;

  @CreateDateColumn({ name: 'created_at', nullable: true, update: true })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @ManyToOne(() => StudioEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'studio_id' })
  studio: StudioEntity;

  @ManyToOne(() => CustomerEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerEntity;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'artist_id' })
  artist: UserEntity;
}
