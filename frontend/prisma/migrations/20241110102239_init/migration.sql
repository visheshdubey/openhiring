/*
  Warnings:

  - You are about to drop the column `experience_range` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `salary_range` on the `Job` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "experience_range",
DROP COLUMN "salary_range",
ADD COLUMN     "max_experience" INTEGER,
ADD COLUMN     "max_salary" INTEGER,
ADD COLUMN     "min_experience" INTEGER,
ADD COLUMN     "min_salary" INTEGER;
