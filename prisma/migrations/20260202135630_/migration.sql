/*
  Warnings:

  - The primary key for the `diskon` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_diskon` on the `diskon` table. All the data in the column will be lost.
  - You are about to drop the column `nama_diskon` on the `diskon` table. All the data in the column will be lost.
  - You are about to drop the column `persentase_diskon` on the `diskon` table. All the data in the column will be lost.
  - You are about to drop the column `tgl_akhir` on the `diskon` table. All the data in the column will be lost.
  - You are about to drop the column `tgl_awal` on the `diskon` table. All the data in the column will be lost.
  - The primary key for the `menu` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `gambar` on the `menu` table. All the data in the column will be lost.
  - You are about to drop the column `id_menu` on the `menu` table. All the data in the column will be lost.
  - You are about to drop the column `nama_makanan` on the `menu` table. All the data in the column will be lost.
  - The values [makanan,minuman] on the enum `Menu_jenis` will be removed. If these variants are still used in the database, this will fail.
  - You are about to alter the column `harga` on the `menu` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - The primary key for the `siswa` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_siswa` on the `siswa` table. All the data in the column will be lost.
  - You are about to drop the column `id_user` on the `siswa` table. All the data in the column will be lost.
  - You are about to drop the column `nama_siswa` on the `siswa` table. All the data in the column will be lost.
  - The primary key for the `stan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_stan` on the `stan` table. All the data in the column will be lost.
  - You are about to drop the column `id_user` on the `stan` table. All the data in the column will be lost.
  - You are about to drop the column `nama_pemilik` on the `stan` table. All the data in the column will be lost.
  - You are about to drop the column `nama_stan` on the `stan` table. All the data in the column will be lost.
  - The primary key for the `transaksi` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_stan` on the `transaksi` table. All the data in the column will be lost.
  - You are about to drop the column `id_transaksi` on the `transaksi` table. All the data in the column will be lost.
  - You are about to drop the column `id_user` on the `transaksi` table. All the data in the column will be lost.
  - You are about to drop the column `nama_pelanggan` on the `transaksi` table. All the data in the column will be lost.
  - You are about to drop the column `tgl_transaksi` on the `transaksi` table. All the data in the column will be lost.
  - You are about to alter the column `status` on the `transaksi` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(2))`.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_user` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `name_user` on the `user` table. All the data in the column will be lost.
  - You are about to alter the column `role` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `Enum(EnumId(0))`.
  - You are about to drop the `detail_transaksi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `menu_diskon` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Siswa` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Stan` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `Diskon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `namaDiskon` to the `Diskon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `persenDiskon` to the `Diskon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stanId` to the `Diskon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggalAkhir` to the `Diskon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggalAwal` to the `Diskon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `namaMakanan` to the `Menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stanId` to the `Menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Siswa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `namaSiswa` to the `Siswa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Siswa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Stan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `namaStan` to the `Stan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Stan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Transaksi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `siswaId` to the `Transaksi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stanId` to the `Transaksi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Siswa_id_user_key` ON `siswa`;

-- DropIndex
DROP INDEX `Stan_id_user_key` ON `stan`;

-- DropIndex
DROP INDEX `Transaksi_id_stan_fkey` ON `transaksi`;

-- DropIndex
DROP INDEX `Transaksi_id_user_fkey` ON `transaksi`;

-- AlterTable
ALTER TABLE `diskon` DROP PRIMARY KEY,
    DROP COLUMN `id_diskon`,
    DROP COLUMN `nama_diskon`,
    DROP COLUMN `persentase_diskon`,
    DROP COLUMN `tgl_akhir`,
    DROP COLUMN `tgl_awal`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `namaDiskon` VARCHAR(191) NOT NULL,
    ADD COLUMN `persenDiskon` DOUBLE NOT NULL,
    ADD COLUMN `stanId` INTEGER NOT NULL,
    ADD COLUMN `tanggalAkhir` DATETIME(3) NOT NULL,
    ADD COLUMN `tanggalAwal` DATETIME(3) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `menu` DROP PRIMARY KEY,
    DROP COLUMN `gambar`,
    DROP COLUMN `id_menu`,
    DROP COLUMN `nama_makanan`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `foto` VARCHAR(191) NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `namaMakanan` VARCHAR(191) NOT NULL,
    ADD COLUMN `stanId` INTEGER NOT NULL,
    MODIFY `jenis` ENUM('MAKANAN', 'MINUMAN') NOT NULL,
    MODIFY `deskripsi` VARCHAR(191) NULL,
    MODIFY `harga` DOUBLE NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `siswa` DROP PRIMARY KEY,
    DROP COLUMN `id_siswa`,
    DROP COLUMN `id_user`,
    DROP COLUMN `nama_siswa`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `namaSiswa` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL,
    MODIFY `alamat` VARCHAR(191) NULL,
    MODIFY `telp` VARCHAR(191) NULL,
    MODIFY `foto` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `stan` DROP PRIMARY KEY,
    DROP COLUMN `id_stan`,
    DROP COLUMN `id_user`,
    DROP COLUMN `nama_pemilik`,
    DROP COLUMN `nama_stan`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `foto` VARCHAR(191) NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `namaPemilik` VARCHAR(191) NULL,
    ADD COLUMN `namaStan` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL,
    MODIFY `telp` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `transaksi` DROP PRIMARY KEY,
    DROP COLUMN `id_stan`,
    DROP COLUMN `id_transaksi`,
    DROP COLUMN `id_user`,
    DROP COLUMN `nama_pelanggan`,
    DROP COLUMN `tgl_transaksi`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `siswaId` INTEGER NOT NULL,
    ADD COLUMN `stanId` INTEGER NOT NULL,
    ADD COLUMN `tanggal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `status` ENUM('BELUM_DIKONFIRM', 'DIMASAK', 'DIANTAR', 'SAMPAI') NOT NULL DEFAULT 'BELUM_DIKONFIRM',
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `id_user`,
    DROP COLUMN `name_user`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `role` ENUM('ADMIN_STAN', 'SISWA') NOT NULL DEFAULT 'SISWA',
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `detail_transaksi`;

-- DropTable
DROP TABLE `menu_diskon`;

-- CreateTable
CREATE TABLE `MenuDiskon` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `menuId` INTEGER NOT NULL,
    `diskonId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetailTransaksi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `qty` INTEGER NOT NULL,
    `hargaBeli` DOUBLE NOT NULL,
    `transaksiId` INTEGER NOT NULL,
    `menuId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Siswa_userId_key` ON `Siswa`(`userId`);

-- CreateIndex
CREATE UNIQUE INDEX `Stan_userId_key` ON `Stan`(`userId`);

-- AddForeignKey
ALTER TABLE `Siswa` ADD CONSTRAINT `Siswa_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stan` ADD CONSTRAINT `Stan_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Menu` ADD CONSTRAINT `Menu_stanId_fkey` FOREIGN KEY (`stanId`) REFERENCES `Stan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Diskon` ADD CONSTRAINT `Diskon_stanId_fkey` FOREIGN KEY (`stanId`) REFERENCES `Stan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MenuDiskon` ADD CONSTRAINT `MenuDiskon_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `Menu`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MenuDiskon` ADD CONSTRAINT `MenuDiskon_diskonId_fkey` FOREIGN KEY (`diskonId`) REFERENCES `Diskon`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaksi` ADD CONSTRAINT `Transaksi_stanId_fkey` FOREIGN KEY (`stanId`) REFERENCES `Stan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaksi` ADD CONSTRAINT `Transaksi_siswaId_fkey` FOREIGN KEY (`siswaId`) REFERENCES `Siswa`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetailTransaksi` ADD CONSTRAINT `DetailTransaksi_transaksiId_fkey` FOREIGN KEY (`transaksiId`) REFERENCES `Transaksi`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetailTransaksi` ADD CONSTRAINT `DetailTransaksi_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `Menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
