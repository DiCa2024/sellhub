/*
  Warnings:

  - Added the required column `feeTable` to the `SalesChannel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SalesChannel" ADD COLUMN     "feeTable" JSONB NOT NULL;
