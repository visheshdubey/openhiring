/*
  Warnings:

  - The `max_salary` column on the `Job` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `min_salary` column on the `Job` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Job" ALTER COLUMN "max_experience" SET DATA TYPE DECIMAL(65,30),
DROP COLUMN "max_salary",
ADD COLUMN     "max_salary" DECIMAL(65,30),
ALTER COLUMN "min_experience" SET DATA TYPE DECIMAL(65,30),
DROP COLUMN "min_salary",
ADD COLUMN     "min_salary" DECIMAL(65,30);
