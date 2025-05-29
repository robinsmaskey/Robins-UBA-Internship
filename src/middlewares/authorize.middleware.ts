// src/middlewares/authorize.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { Permission } from '../auth/permissions';
import { RolePermissions } from '../auth/role-permissions';

export const authorize = (requiredPermission: Permission) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const userPermissions = RolePermissions[req.user.role];
    if (!userPermissions.includes(requiredPermission)) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }

    next();
  };
};