import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { AppointmentEntity } from './appointment.entity';
import { SessionMaterialEntity } from './session-material.entity';

@Entity('sessions')
export class SessionEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ name: 'appointment_id', type: 'bigint', unique: true })
  appointmentId: number;

  @Column({ name: 'consent_term_snapshot', type: 'text', nullable: true })
  consentTermSnapshot: string | null;

  @Column({
    name: 'client_signature_url',
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  clientSignatureUrl: string | null;

  @Column({
    name: 'photo_before_url',
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  photoBeforeUrl: string | null;

  @Column({
    name: 'photo_after_url',
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  photoAfterUrl: string | null;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @Column({ name: 'started_at', type: 'timestamp', nullable: true })
  startedAt: Date | null;

  @Column({ name: 'finished_at', type: 'timestamp', nullable: true })
  finishedAt: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @OneToOne(() => AppointmentEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'appointment_id' })
  appointment: AppointmentEntity;

  @OneToMany(
    () => SessionMaterialEntity,
    (material: SessionMaterialEntity): SessionEntity => material.session,
  )
  materials: SessionMaterialEntity[];
}
