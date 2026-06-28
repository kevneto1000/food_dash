/*
  Warnings:

  - You are about to drop the column `avalaible` on the `Food` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Food" DROP COLUMN "avalaible",
ADD COLUMN     "available" BOOLEAN NOT NULL DEFAULT true;
