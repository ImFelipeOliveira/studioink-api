import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CommissionTypeEnum } from './Enum/commission-type.enum';
import { UserEntity } from './user.entity';

@Entity('artist_profiles')
export class ArtistProfileEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @PrimaryColumn({ name: 'role_id', type: 'bigint' })
  userId: number;

  @Column({ name: 'bio', type: 'text' })
  bio: string;

  @Column({ name: 'styles', type: 'json' })
  styles: string;

  @Column({
    name: 'commission_type',
    type: 'enum',
    enum: CommissionTypeEnum,
    default: CommissionTypeEnum.PERCENTAGE,
  })
  commissionType: CommissionTypeEnum;

  @Column({ name: 'default_commission_rate', type: 'int' })
  defaultCommissionRate: number;

  @Column({ name: 'calendar_color', type: 'int' })
  calendarColor: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updated_at: Date | null;

  @ManyToOne(
    () => UserEntity,
    (user: UserEntity): ArtistProfileEntity[] => user.artistProfile,
  )
  user: UserEntity;
}
