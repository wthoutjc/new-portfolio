/*
  Warnings:

  - You are about to drop the column `multimedia` on the `Educations` table. All the data in the column will be lost.
  - You are about to drop the column `multimedia` on the `Experiences` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Educations` DROP COLUMN `multimedia`;

-- AlterTable
ALTER TABLE `Experiences` DROP COLUMN `multimedia`;
