/*
  Warnings:

  - You are about to drop the column `applyEmails` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `applyLinks` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `experienceRange` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `jobTitle` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `jobType` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `jobWorkMode` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `salaryCurrency` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `salaryRange` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `seekingWork` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Job` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_userId_fkey";

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "applyEmails",
DROP COLUMN "applyLinks",
DROP COLUMN "createdAt",
DROP COLUMN "experienceRange",
DROP COLUMN "jobTitle",
DROP COLUMN "jobType",
DROP COLUMN "jobWorkMode",
DROP COLUMN "salaryCurrency",
DROP COLUMN "salaryRange",
DROP COLUMN "seekingWork",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "apply_emails" TEXT[],
ADD COLUMN     "apply_links" TEXT[],
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "experience_range" INTEGER[],
ADD COLUMN     "job_title" TEXT,
ADD COLUMN     "job_type" "JobType",
ADD COLUMN     "job_work_mode" "JobWorkMode",
ADD COLUMN     "salary_currency" TEXT,
ADD COLUMN     "salary_range" TEXT[],
ADD COLUMN     "seeking_work" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
