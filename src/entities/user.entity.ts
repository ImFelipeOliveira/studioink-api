import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleUserEntity } from './role-user.entity';
import { ArtistProfileEntity } from './artist-profile.entity';
import { StudioEntity } from './studio.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ name: 'password_hash', length: 255 })
  passwordHash: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at', nullable: true, update: true })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    nullable: true,
    update: true,
  })
  updatedAt: Date | null;

  @OneToMany(() => StudioEntity, (studio) => studio.owner)
  ownedStudios: StudioEntity[];

  @OneToMany(() => RoleUserEntity, (ru: RoleUserEntity): UserEntity => ru.user)
  roleUsers: RoleUserEntity[];

  @OneToMany(() => ArtistProfileEntity, (profile) => profile.user)
  artistProfiles: ArtistProfileEntity[];
}
