-- DropForeignKey
ALTER TABLE `detail_transaksi` DROP FOREIGN KEY `Detail_transaksi_id_menu_fkey`;

-- DropForeignKey
ALTER TABLE `detail_transaksi` DROP FOREIGN KEY `Detail_transaksi_id_transaksi_fkey`;

-- DropForeignKey
ALTER TABLE `menu_diskon` DROP FOREIGN KEY `Menu_diskon_id_diskon_fkey`;

-- DropForeignKey
ALTER TABLE `menu_diskon` DROP FOREIGN KEY `Menu_diskon_id_menu_fkey`;

-- DropForeignKey
ALTER TABLE `siswa` DROP FOREIGN KEY `Siswa_id_user_fkey`;

-- DropForeignKey
ALTER TABLE `stan` DROP FOREIGN KEY `Stan_id_user_fkey`;

-- DropForeignKey
ALTER TABLE `transaksi` DROP FOREIGN KEY `Transaksi_id_stan_fkey`;

-- DropForeignKey
ALTER TABLE `transaksi` DROP FOREIGN KEY `Transaksi_id_user_fkey`;

-- AlterTable
ALTER TABLE `stan` MODIFY `telp` VARCHAR(20) NOT NULL;
