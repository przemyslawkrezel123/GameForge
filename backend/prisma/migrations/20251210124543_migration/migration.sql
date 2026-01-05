/*
  Warnings:

  - You are about to drop the column `opinion` on the `games` table. All the data in the column will be lost.
  - You are about to drop the column `ranking` on the `games` table. All the data in the column will be lost.
  - Added the required column `description` to the `games` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "games" DROP COLUMN "opinion",
DROP COLUMN "ranking",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "rate" DECIMAL(10,2) NOT NULL DEFAULT 0.0;
