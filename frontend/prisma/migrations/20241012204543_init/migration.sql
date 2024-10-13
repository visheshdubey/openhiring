/*
  Warnings:

  - The values [FULL_TIME,CONTRACT,FREELANCE,PART_TIME] on the enum `JobType` will be removed. If these variants are still used in the database, this will fail.
  - The values [WORK_FROM_HOME,WORK_FROM_OFFICE,HYBRID] on the enum `JobWorkMode` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "JobType_new" AS ENUM ('FullTime', 'Contract', 'Freelance', 'PartTime', 'INTERNSHIP');
ALTER TABLE "Job" ALTER COLUMN "job_type" TYPE "JobType_new" USING ("job_type"::text::"JobType_new");
ALTER TYPE "JobType" RENAME TO "JobType_old";
ALTER TYPE "JobType_new" RENAME TO "JobType";
DROP TYPE "JobType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "JobWorkMode_new" AS ENUM ('Remote', 'OnSite', 'Hybrid');
ALTER TABLE "Job" ALTER COLUMN "job_work_mode" TYPE "JobWorkMode_new" USING ("job_work_mode"::text::"JobWorkMode_new");
ALTER TYPE "JobWorkMode" RENAME TO "JobWorkMode_old";
ALTER TYPE "JobWorkMode_new" RENAME TO "JobWorkMode";
DROP TYPE "JobWorkMode_old";
COMMIT;
