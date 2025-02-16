/*
  Warnings:

  - You are about to drop the `ProfileSkills` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profiles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `ProfileSkills` DROP FOREIGN KEY `ProfileSkills_profileId_fkey`;

-- DropForeignKey
ALTER TABLE `ProfileSkills` DROP FOREIGN KEY `ProfileSkills_skillId_fkey`;

-- DropForeignKey
ALTER TABLE `Profiles` DROP FOREIGN KEY `Profiles_userId_fkey`;

-- DropTable
DROP TABLE `ProfileSkills`;

-- DropTable
DROP TABLE `Profiles`;

-- CreateTable
CREATE TABLE `UsersSkills` (
    `id` CHAR(36) NOT NULL,
    `userId` CHAR(36) NOT NULL,
    `skillId` CHAR(36) NOT NULL,
    `level` ENUM('EXPERT', 'COMPETENT', 'BEGINNER', 'NO_EXPERIENCE') NOT NULL,
    `source` ENUM('EXPERIENCE', 'EDUCATION', 'SELF_TAUGHT') NOT NULL,
    `yearsOfExperience` DOUBLE NOT NULL,
    `sourceId` CHAR(36) NULL,
    `deletedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `UsersSkills_userId_idx`(`userId`),
    INDEX `UsersSkills_skillId_idx`(`skillId`),
    UNIQUE INDEX `UsersSkills_userId_skillId_key`(`userId`, `skillId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UsersSkills` ADD CONSTRAINT `UsersSkills_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsersSkills` ADD CONSTRAINT `UsersSkills_skillId_fkey` FOREIGN KEY (`skillId`) REFERENCES `Skills`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
