import { PermissionEntity } from '../../entities/permission.entity';
import dataSource from '../../data-source';
import { Repository } from 'typeorm';
import { RoleEntity } from '../../entities/role.entity';
import { PermissionRoleEntity } from '../../entities/permission-role.entity';
import configuration from '../../config/configuration';

export const PERMISSIONS_LIST: { slug: string; name: string }[] = [
  // --- AGENDAMENTOS ---
  { slug: 'appointment.view', name: 'Visualizar Agendamentos' },
  { slug: 'appointment.create', name: 'Criar Agendamento' },
  { slug: 'appointment.update', name: 'Editar Agendamento' },
  { slug: 'appointment.delete', name: 'Deletar Agendamento' },

  // --- CLIENTES ---
  { slug: 'customer.view', name: 'Visualizar Clientes' },
  { slug: 'customer.create', name: 'Cadastrar Cliente' },
  { slug: 'customer.update', name: 'Editar Cliente' },
  { slug: 'customer.ban', name: 'Banir Cliente' }, // Crítico

  // --- FINANCEIRO ---
  { slug: 'financial.view', name: 'Visualizar Financeiro' },
  { slug: 'financial.create_entry', name: 'Lançar Receita/Despesa' },
  { slug: 'financial.reports', name: 'Exportar Relatórios' },

  // --- ESTOQUE ---
  { slug: 'inventory.view', name: 'Visualizar Estoque' },
  { slug: 'inventory.manage', name: 'Gerenciar Estoque' },

  // --- SISTEMA / ESTÚDIO ---
  { slug: 'studio.update', name: 'Editar Configurações do Estúdio' },
  { slug: 'team.manage', name: 'Gerenciar Equipe (Add/Remove)' },
];

export const SYSTEM_ROLES: {
  slug: string;
  name: string;
  description: string;
}[] = [
  {
    slug: 'owner',
    name: 'Dono (Owner)',
    description: 'Acesso total a todas as funcionalidades do estúdio.',
  },
  {
    slug: 'manager',
    name: 'Gerente',
    description: 'Gestão do dia a dia, financeiro e equipe.',
  },
  {
    slug: 'artist',
    name: 'Tatuador(a)',
    description: 'Foco na agenda e execução do serviço.',
  },
  {
    slug: 'receptionist',
    name: 'Recepcionista',
    description: 'Atendimento ao cliente e agendamento.',
  },
];

export const run = async () => {
  if (!dataSource.isInitialized) await dataSource.initialize();
  const permRepo: Repository<PermissionEntity> =
    dataSource.getRepository(PermissionEntity);
  const roleRepo: Repository<RoleEntity> = dataSource.getRepository(RoleEntity);
  const permRoleRepo: Repository<PermissionRoleEntity> =
    dataSource.getRepository(PermissionRoleEntity);

  console.log('Iniciando Fixture de ACL...');

  const allPermissionsEntities: PermissionEntity[] = [];

  for (const permission of PERMISSIONS_LIST) {
    let entity = await permRepo.findOneBy({ slug: permission.slug });

    if (!entity) {
      entity = permRepo.create({
        slug: permission.slug,
        name: permission.name,
      });
      await permRepo.save(entity);
      console.log(`Permissão Criada: ${permission.slug}`);
    } else {
      if (entity.name !== permission.name) {
        entity.name = permission.name;
        await permRepo.save(entity);
      }
    }
    allPermissionsEntities.push(entity);
  }

  for (const roleData of SYSTEM_ROLES) {
    let role: RoleEntity | null = await roleRepo.findOne({
      where: { slug: roleData.slug },
    });

    if (!role) {
      role = roleRepo.create({
        slug: roleData.slug,
        name: roleData.name,
        description: roleData.description,
      });
      await roleRepo.save(role);
      console.log(`Role Criada: ${roleData.slug}`);
    } else {
      role.name = roleData.name;
      role.description = roleData.description;
      await roleRepo.save(role);
    }

    let permissionsToAssign: PermissionEntity[] = [];

    switch (roleData.slug) {
      case 'owner':
        permissionsToAssign = allPermissionsEntities;
        break;
      case 'manager':
        permissionsToAssign = allPermissionsEntities.filter(
          (p) => p.slug !== 'studio.update' && p.slug !== 'customer.ban',
        );
        break;
      case 'artist':
        permissionsToAssign = allPermissionsEntities.filter(
          (p) =>
            p.slug.startsWith('appointment.') ||
            p.slug === 'customer.view' ||
            p.slug === 'inventory.view',
        );
        break;
      case 'receptionist':
        permissionsToAssign = allPermissionsEntities.filter(
          (p) =>
            p.slug.startsWith('appointment.') ||
            p.slug.startsWith('customer.') ||
            p.slug === 'financial.create_entry',
        );
        break;
    }

    await permRoleRepo.delete({ roleId: role.id });

    const permissionRolesToSave: PermissionRoleEntity[] = [];

    for (const permEntity of permissionsToAssign) {
      const pr = permRoleRepo.create({
        role: role,
        permission: permEntity,
      });
      permissionRolesToSave.push(pr);
    }

    if (permissionRolesToSave.length > 0) {
      await permRoleRepo.save(permissionRolesToSave);
    }

    console.log(
      `Role '${roleData.slug}' sincronizada com ${permissionsToAssign.length} permissões.`,
    );
  }

  console.log('Fixture ACL Finalizado!');
};

void run();
