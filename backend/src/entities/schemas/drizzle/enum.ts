import { UserRole } from '@/entities/constants/rbac';
import { pgEnum } from 'drizzle-orm/pg-core';

export const UserRoleEnum = pgEnum('Role', [UserRole.User, UserRole.Admin]);