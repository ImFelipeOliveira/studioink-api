import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { StudioEntity } from './studio.entity';
import { RoleEntity } from './role.entity';

@Entity('role_user')
export class RoleUserEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @PrimaryColumn({ name: 'user_id', type: 'bigint' })
  userId: string;

  @PrimaryColumn({ name: 'role_id', type: 'int' })
  roleId: number;

  @PrimaryColumn({ name: 'studio_id', type: 'bigint' })
  studioId: string;

  @ManyToOne(
    () => UserEntity,
    (user: UserEntity): RoleUserEntity[] => user.roleUsers,
    {
      onDelete: 'CASCADE',
    },
  )
  user: UserEntity;

  @ManyToOne(
    () => RoleEntity,
    (r: RoleEntity): RoleUserEntity[] => r.roleUsers,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;

  @ManyToOne(
    () => StudioEntity,
    (s: StudioEntity): RoleUserEntity[] => s.roleUsers,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'studio_id' })
  studio: StudioEntity;

  @CreateDateColumn({ name: 'created_at', nullable: true, update: true })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updateAt: Date | null;
}
