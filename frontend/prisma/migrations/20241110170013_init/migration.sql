/*
  Warnings:

  - You are about to drop the column `user_id` on the `Job` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_user_id_fkey";

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "user_id";

-- CreateTable
CREATE TABLE "UserJobBookMark" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,

    CONSTRAINT "UserJobBookMark_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserJobBookMark" ADD CONSTRAINT "UserJobBookMark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserJobBookMark" ADD CONSTRAINT "UserJobBookMark_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
