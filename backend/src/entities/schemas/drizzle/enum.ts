import { UserRoleType } from '@/entities/constants/rbac';
import { pgEnum } from 'drizzle-orm/pg-core';

export const RoleType = pgEnum('RoleType', [UserRoleType.User, UserRoleType.Admin]);