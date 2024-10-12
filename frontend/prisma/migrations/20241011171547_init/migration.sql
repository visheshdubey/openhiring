-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('APPROVED', 'REJECTED', 'AWAITING_USER_INFO');

-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('FULL_TIME', 'CONTRACT', 'FREELANCE', 'PART_TIME', 'INTERNSHIP');

-- CreateEnum
CREATE TYPE "JobWorkMode" AS ENUM ('WORK_FROM_HOME', 'WORK_FROM_OFFICE', 'HYBRID');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "avatar" TEXT,
    "token" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RawJob" (
    "id" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RawJob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProcessedJob" (
    "id" TEXT NOT NULL,
    "company" TEXT,
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
    "status" "JobStatus" NOT NULL DEFAULT 'AWAITING_USER_INFO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "ProcessedJob_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "ProcessedJob" ADD CONSTRAINT "ProcessedJob_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
