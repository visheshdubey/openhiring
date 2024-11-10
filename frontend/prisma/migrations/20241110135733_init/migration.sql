/*
  Warnings:

  - The `job_type` column on the `Job` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `job_work_mode` column on the `Job` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "job_type",
ADD COLUMN     "job_type" TEXT,
DROP COLUMN "job_work_mode",
ADD COLUMN     "job_work_mode" TEXT;

-- DropEnum
DROP TYPE "JobType";

-- DropEnum
DROP TYPE "JobWorkMode";
