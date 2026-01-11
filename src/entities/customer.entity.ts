import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  Unique,
} from 'typeorm';
import { StudioEntity } from './studio.entity';

@Entity('customers')
@Unique(['email', 'studioId'])
@Unique(['phone', 'studioId'])
@Unique(['cpf', 'studioId'])
export class CustomerEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ name: 'studio_id', type: 'bigint' })
  studioId: number;

  @Column({ name: 'name', type: 'varchar', nullable: true })
  name: string | null;

  @Column({ name: 'email', type: 'varchar', nullable: true })
  email: string | null;

  @Column({ name: 'phone', type: 'varchar', length: 20, nullable: true })
  phone: string | null;

  @Column({ name: 'cpf', type: 'varchar', length: 20, nullable: true })
  cpf: string | null;

  @Column({ name: 'birth_date', type: 'date', nullable: true })
  birthDate: Date | null;

  @Column({
    name: 'total_spent',
    type: 'int',
    default: 0,
  })
  totalSpent: string;

  @Column({ name: 'visits_count', type: 'int', default: 0 })
  visitsCount: number;

  @Column({ name: 'is_banned', type: 'boolean', default: false })
  isBanned: boolean;

  @Column({ name: 'ban_reason', type: 'text', nullable: true })
  banReason: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @ManyToOne(() => StudioEntity, (studio) => studio.customers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'studio_id' })
  studio: StudioEntity;
}
