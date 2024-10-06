DO $$ BEGIN
 CREATE TYPE "public"."Role" AS ENUM('user', 'admin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bookmarks" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"job_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "jobs" (
	"id" serial PRIMARY KEY NOT NULL,
	"job_title" varchar(255) NOT NULL,
	"location" text,
	"company_name" varchar(255),
	"remote_onsite" varchar(50),
	"employment_type" varchar(50),
	"job_description" text,
	"skills_required" text[],
	"apply_link" text,
	"contact_email" varchar(255),
	"company_description" text,
	"tech_stack" text[],
	"salary_range" integer[],
	"experience_required" integer[],
	"is_urgent" boolean DEFAULT false,
	"posted_on" timestamp NOT NULL,
	"tags" text[] NOT NULL,
	"applicant" integer,
	"links" jsonb,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"gender" varchar(50),
	"dob" date,
	"is_verified" boolean DEFAULT false,
	"is_blocked" boolean DEFAULT false,
	"is_shadowbanned" boolean DEFAULT false,
	"role" varchar(20) DEFAULT 'USER' NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_job_id_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."jobs"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
