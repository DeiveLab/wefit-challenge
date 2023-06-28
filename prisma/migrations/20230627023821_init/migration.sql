-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `cnpj` VARCHAR(191) NULL,
    `cpf` VARCHAR(191) NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `cellphone` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_cnpj_key`(`cnpj`),
    UNIQUE INDEX `User_cpf_key`(`cpf`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserAddress` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `street` VARCHAR(191) NOT NULL,
    `number` VARCHAR(191) NOT NULL,
    `complement` VARCHAR(191) NULL,
    `neighborhood` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `zipCode` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `UserAddress_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserAddress` ADD CONSTRAINT `UserAddress_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
