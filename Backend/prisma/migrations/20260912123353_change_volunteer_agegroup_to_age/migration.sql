/*
  Warnings:

  - You are about to drop the column `ageGroup` on the `VolunteerProfile` table. All the data in the column will be lost.
  - You are about to drop the column `bio` on the `VolunteerProfile` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `VolunteerProfile` table. All the data in the column will be lost.
  - You are about to drop the column `interests` on the `VolunteerProfile` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `VolunteerProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "VolunteerProfile" DROP COLUMN "ageGroup",
DROP COLUMN "bio",
DROP COLUMN "country",
DROP COLUMN "interests",
DROP COLUMN "state",
ADD COLUMN     "age" INTEGER;
