/*
  Warnings:

  - A unique constraint covering the columns `[updatedAt]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_updatedAt_key" ON "users"("updatedAt");
