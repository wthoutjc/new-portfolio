/*
  Warnings:

  - You are about to drop the `Experience` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ExperienceSkill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProfileSkill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Skill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Experience` DROP FOREIGN KEY `Experience_userId_fkey`;

-- DropForeignKey
ALTER TABLE `ExperienceSkill` DROP FOREIGN KEY `ExperienceSkill_experienceId_fkey`;

-- DropForeignKey
ALTER TABLE `ExperienceSkill` DROP FOREIGN KEY `ExperienceSkill_skillId_fkey`;

-- DropForeignKey
ALTER TABLE `Profile` DROP FOREIGN KEY `Profile_userId_fkey`;

-- DropForeignKey
ALTER TABLE `ProfileSkill` DROP FOREIGN KEY `ProfileSkill_profileId_fkey`;

-- DropForeignKey
ALTER TABLE `ProfileSkill` DROP FOREIGN KEY `ProfileSkill_skillId_fkey`;

-- DropTable
DROP TABLE `Experience`;

-- DropTable
DROP TABLE `ExperienceSkill`;

-- DropTable
DROP TABLE `Profile`;

-- DropTable
DROP TABLE `ProfileSkill`;

-- DropTable
DROP TABLE `Skill`;

-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `Users` (
    `id` CHAR(36) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Users_email_key`(`email`),
    INDEX `email_users_idx`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profiles` (
    `id` CHAR(36) NOT NULL,
    `userId` CHAR(36) NOT NULL,
    `headline` VARCHAR(191) NULL,
    `location` VARCHAR(191) NULL,
    `multimedia` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Profiles_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Experiences` (
    `id` CHAR(36) NOT NULL,
    `userId` CHAR(36) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `employmentType` VARCHAR(191) NULL,
    `company` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NULL,
    `locationType` VARCHAR(191) NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NULL,
    `currentlyWorking` BOOLEAN NOT NULL DEFAULT false,
    `description` VARCHAR(191) NULL,
    `multimedia` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Skills` (
    `id` CHAR(36) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `deletedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Skills_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProfileSkills` (
    `profileId` CHAR(36) NOT NULL,
    `skillId` CHAR(36) NOT NULL,

    PRIMARY KEY (`profileId`, `skillId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExperienceSkills` (
    `experienceId` CHAR(36) NOT NULL,
    `skillId` CHAR(36) NOT NULL,

    PRIMARY KEY (`experienceId`, `skillId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Profiles` ADD CONSTRAINT `Profiles_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Experiences` ADD CONSTRAINT `Experiences_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfileSkills` ADD CONSTRAINT `ProfileSkills_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profiles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfileSkills` ADD CONSTRAINT `ProfileSkills_skillId_fkey` FOREIGN KEY (`skillId`) REFERENCES `Skills`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExperienceSkills` ADD CONSTRAINT `ExperienceSkills_experienceId_fkey` FOREIGN KEY (`experienceId`) REFERENCES `Experiences`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExperienceSkills` ADD CONSTRAINT `ExperienceSkills_skillId_fkey` FOREIGN KEY (`skillId`) REFERENCES `Skills`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
