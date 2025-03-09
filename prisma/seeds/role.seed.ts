import { Prisma, PrismaClient } from '@prisma/client';
import { PermissionEnum } from '../../libs/common/src/constants/permission.enum';
import { BaseRoleEnum } from '../../libs/common/src/constants/base-roles.enum';

export async function seedRole(prisma: PrismaClient) {
  await createRole(prisma, BaseRoleEnum.Admin, null);
  await createRole(prisma, BaseRoleEnum.Bronze, null);
  await createRole(prisma, BaseRoleEnum.Silver, null);
  await createRole(prisma, BaseRoleEnum.Gold, null);
  await createRole(prisma, BaseRoleEnum.Platinum, null);
  await createRole(prisma, BaseRoleEnum.Jade, null);
  await createRole(prisma, BaseRoleEnum.Sapphire, null);
}

async function createRole(
  prisma: PrismaClient,
  roleName: string,
  permissionNames: PermissionEnum[] | null,
) {
  await prisma.$transaction(async (prisma) => {
    const createdRole = await prisma.role.create({
      data: { name: roleName },
    });

    const permissionsQuery: Prisma.PermissionWhereInput = permissionNames
      ? { name: { in: permissionNames } }
      : {};

    const permissions = await prisma.permission.findMany({
      where: permissionsQuery,
    });

    await prisma.rolePermission.createMany({
      data: permissions.map((permission) => ({
        roleId: createdRole.id,
        permissionId: permission.id,
      })),
    });
  });
}
