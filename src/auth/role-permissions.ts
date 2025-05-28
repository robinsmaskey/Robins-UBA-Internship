// src/auth/role-permissions.ts
import { Permission } from './permissions';
import { UserRole } from '../entity/user';

export const RolePermissions: Record<UserRole, Permission[]> = {
  [UserRole.ADMIN]: [
    Permission.USER_READ,
    Permission.USER_CREATE,
    Permission.USER_UPDATE,
    Permission.USER_DELETE
  ],
  [UserRole.EDITOR]: [
    Permission.USER_READ,
    Permission.USER_UPDATE
  ],
  [UserRole.USER]: [
    Permission.USER_READ
  ]
};