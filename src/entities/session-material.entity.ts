import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SessionEntity } from './session.entity';
import { InventoryBatchEntity } from './inventory-batch.entity';

@Entity('session_materials')
export class SessionMaterialEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ name: 'session_id', type: 'bigint' })
  sessionId: number;

  @Column({ name: 'batch_id', type: 'bigint' })
  batchId: number;

  @Column({ name: 'quantity_used', type: 'int', nullable: true })
  quantityUsed: number | null;

  @CreateDateColumn({ name: 'created_at', nullable: true, update: true })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @ManyToOne(
    () => SessionEntity,
    (session): SessionMaterialEntity[] => session.materials,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'session_id' })
  session: SessionEntity;

  @ManyToOne(
    () => InventoryBatchEntity,
    (batch): SessionMaterialEntity[] => batch.sessionMaterials,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'batch_id' })
  batch: InventoryBatchEntity;
}
