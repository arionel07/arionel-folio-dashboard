-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('INCOME', 'EXPENSE');

-- AlterTable
ALTER TABLE "transaction" ADD COLUMN     "type" "TransactionType" NOT NULL DEFAULT 'EXPENSE';
