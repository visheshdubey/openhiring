import { pgTable, serial, varchar, text, boolean, integer, date, timestamp, jsonb } from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';

export const jobs = pgTable('jobs', {
    id: serial('id').primaryKey(),
    jobTitle: varchar('job_title', { length: 255 }).notNull(),
    location: text('location'),
    companyName: varchar('company_name', { length: 255 }),
    remoteOnsite: varchar('remote_onsite', { length: 50 }),
    employmentType: varchar('employment_type', { length: 50 }),
    jobDescription: text('job_description'),
    skillsRequired: text('skills_required').array(),
    applyLink: text('apply_link'),
    contactEmail: varchar('contact_email', { length: 255 }),
    companyDescription: text('company_description'),
    techStack: text('tech_stack').array(),
    salaryRange: integer('salary_range').array(),
    experienceRequired: integer('experience_required').array(),
    isUrgent: boolean('is_urgent').default(false),
    postedOn: timestamp('posted_on').notNull(),
    tags: text('tags').array().notNull(),
    applicant: integer('applicant'),
    links: jsonb('links'),
    createdAt: timestamp('created_at')
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
    updatedAt: timestamp('updated_at')
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull()
        .$defaultFn(() => new Date())
});

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    gender: varchar('gender', { length: 50 }),
    dob: date('dob'),
    isVerified: boolean('is_verified').default(false),
    isBlocked: boolean('is_blocked').default(false),
    isShadowbanned: boolean('is_shadowbanned').default(false),
    role: varchar('role', { length: 20 }).notNull().default('USER'),
    createdAt: timestamp('created_at')
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
    updatedAt: timestamp('updated_at')
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull()
        .$defaultFn(() => new Date())
});

// Bookmarks relation table
export const bookmarks = pgTable('bookmarks', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull().references(() => users.id),
    jobId: integer('job_id').notNull().references(() => jobs.id),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
    bookmarks: many(bookmarks),
}));

export const jobsRelations = relations(jobs, ({ many }) => ({
    bookmarks: many(bookmarks),
}));

export const bookmarksRelations = relations(bookmarks, ({ one }) => ({
    user: one(users, {
        fields: [bookmarks.userId],
        references: [users.id],
    }),
    job: one(jobs, {
        fields: [bookmarks.jobId],
        references: [jobs.id],
    }),
}));