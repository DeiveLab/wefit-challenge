/*
  Warnings:

  - The values [CLIENT,SUPPLIER] on the enum `User_type` will be removed. If these variants are still used in the database, this will fail.
  - You are about to alter the column `number` on the `UserAddress` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `type` ENUM('client', 'supplier') NOT NULL;

-- AlterTable
ALTER TABLE `UserAddress` MODIFY `number` INTEGER NOT NULL;
