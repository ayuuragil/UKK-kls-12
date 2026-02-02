/*
  Warnings:

  - Added the required column `name_user` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `User_username_key` ON `user`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `name_user` VARCHAR(191) NOT NULL,
    MODIFY `role` ENUM('admin_stan', 'siswa') NOT NULL DEFAULT 'admin_stan';
