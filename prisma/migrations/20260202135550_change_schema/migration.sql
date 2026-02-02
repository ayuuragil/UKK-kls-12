-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('admin_stan', 'siswa') NOT NULL DEFAULT 'siswa';
