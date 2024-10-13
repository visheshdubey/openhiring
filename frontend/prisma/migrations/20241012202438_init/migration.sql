/*
  Warnings:

  - You are about to drop the `ProcessedJob` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RawJob` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProcessedJob" DROP CONSTRAINT "ProcessedJob_userId_fkey";

-- DropTable
DROP TABLE "ProcessedJob";

-- DropTable
DROP TABLE "RawJob";

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "company" TEXT,
    "jobTitle" TEXT,
    "salaryRange" TEXT[],
    "salaryCurrency" TEXT,
    "jobType" "JobType",
    "jobWorkMode" "JobWorkMode",
    "location" TEXT,
    "applyEmails" TEXT[],
    "applyLinks" TEXT[],
    "technology" TEXT[],
    "experienceRange" INTEGER[],
    "tags" TEXT[],
    "raw" TEXT NOT NULL,
    "seekingWork" BOOLEAN NOT NULL DEFAULT false,
    "status" "JobStatus" NOT NULL DEFAULT 'AWAITING_USER_INFO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
