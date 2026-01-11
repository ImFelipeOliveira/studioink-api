import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PermissionRoleEntity } from './permission-role.entity';

@Entity('permissions')
export class PermissionEntity {
  @PrimaryGeneratedColumn('increment', { type: 'int' })
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100, unique: true })
  slug: string;

  @OneToMany(
    () => PermissionRoleEntity,
    (pr: PermissionRoleEntity): PermissionEntity => pr.permission,
  )
  permissionRoles: PermissionRoleEntity[];
}
