/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "users_updatedAt_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "updatedAt";
