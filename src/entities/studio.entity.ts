import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleUserEntity } from './role-user.entity';

@Entity('studios')
export class StudioEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255, unique: true, nullable: false })
  slug: string;

  @Column({ type: 'json', name: 'config_settings', nullable: true })
  configSettings: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @OneToMany(
    () => RoleUserEntity,
    (ru: RoleUserEntity): StudioEntity => ru.studio,
  )
  roleUsers: RoleUserEntity[];
}
