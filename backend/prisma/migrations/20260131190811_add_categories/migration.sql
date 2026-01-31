/*
  Warnings:

  - The `category` column on the `transaction` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('FOOD', 'SALARY', 'ENTERTAINMENT', 'TRAVEL', 'HEALTH', 'OTHER');

-- AlterTable
ALTER TABLE "transaction" DROP COLUMN "category",
ADD COLUMN     "category" "Category" NOT NULL DEFAULT 'OTHER';
