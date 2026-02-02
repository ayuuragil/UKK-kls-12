/*
  Warnings:

  - You are about to drop the column `password` on the `siswa` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `siswa` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `stan` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `stan` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_user]` on the table `Siswa` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_user]` on the table `Stan` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_user` to the `Siswa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user` to the `Stan` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Siswa_username_key` ON `siswa`;

-- DropIndex
DROP INDEX `Stan_username_key` ON `stan`;

-- AlterTable
ALTER TABLE `siswa` DROP COLUMN `password`,
    DROP COLUMN `username`,
    ADD COLUMN `id_user` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `stan` DROP COLUMN `password`,
    DROP COLUMN `username`,
    ADD COLUMN `id_user` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` ALTER COLUMN `role` DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX `Siswa_id_user_key` ON `Siswa`(`id_user`);

-- CreateIndex
CREATE UNIQUE INDEX `Stan_id_user_key` ON `Stan`(`id_user`);

-- CreateIndex
CREATE UNIQUE INDEX `User_username_key` ON `User`(`username`);

-- AddForeignKey
ALTER TABLE `Siswa` ADD CONSTRAINT `Siswa_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stan` ADD CONSTRAINT `Stan_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;
