import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CustomerEntity } from './customer.entity';
import { UserEntity } from './user.entity';

@Entity('anamnesis_forms')
export class AnamnesisFormEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ name: 'customer_id', type: 'bigint' })
  customerId: number;

  @Column({ type: 'json' })
  answers: any;

  @Column({ name: 'signature_url', type: 'varchar', nullable: true })
  signatureUrl: string | null;

  @Column({ name: 'signed_at', type: 'timestamp', nullable: true })
  signedAt: Date | null;

  @Column({ name: 'ip_address', type: 'varchar', length: 45, nullable: true })
  ipAddress: string | null;

  @Column({ name: 'reviewed_by_artist_id', type: 'bigint', nullable: true })
  reviewedByArtistId: number | null;

  @Column({ name: 'reviewed_at', type: 'timestamp', nullable: true })
  reviewedAt: Date | null;

  @CreateDateColumn({ name: 'created_at', nullable: true, update: true })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @ManyToOne(() => CustomerEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerEntity;

  @ManyToOne(() => UserEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'reviewed_by_artist_id' })
  reviewedByArtist: UserEntity | null;
}
