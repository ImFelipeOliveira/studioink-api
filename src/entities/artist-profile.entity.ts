import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { CommissionTypeEnum } from './Enum/commission-type.enum';
import { UserEntity } from './user.entity';
import { StudioEntity } from './studio.entity';

@Entity('artist_profiles')
export class ArtistProfileEntity {
  @PrimaryColumn({ name: 'user_id', type: 'bigint' })
  userId: number;

  @PrimaryColumn({ name: 'studio_id', type: 'bigint' })
  studioId: number;

  @Column({ name: 'bio', type: 'text', nullable: true })
  bio: string | null;

  @Column({ name: 'styles', type: 'json', nullable: true })
  styles: any;

  @Column({
    name: 'commission_type',
    type: 'enum',
    enum: CommissionTypeEnum,
    default: CommissionTypeEnum.PERCENTAGE,
  })
  commissionType: CommissionTypeEnum;

  @Column({
    name: 'default_commission_value',
    type: 'int',
    nullable: true,
  })
  defaultCommissionValue: number | null;

  @Column({
    name: 'calendar_color',
    type: 'varchar',
    length: 7,
    nullable: true,
  })
  calendarColor: string | null;

  @CreateDateColumn({ name: 'created_at', nullable: true, update: true })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @ManyToOne(() => UserEntity, (user) => user.artistProfiles)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => StudioEntity, (studio) => studio.artistProfiles)
  @JoinColumn({ name: 'studio_id' })
  studio: StudioEntity;
}
