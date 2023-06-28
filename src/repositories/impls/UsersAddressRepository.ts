import { UserAddress } from "../../entities/UserAddress";
import { prisma } from "../../infra/db/PrismaClient";
import { IUsersAddressRepository } from "../IUsersAddressRepository";

export class UsersAddressRepository implements IUsersAddressRepository {
    async create({ city, neighborhood, number, state, street, userId, zipCode, complement }: UserAddress): Promise<UserAddress> {
        const userAddress = UserAddress.create({ city, neighborhood, number, state, street, userId, zipCode, complement });

        await prisma.userAddress.create({
            data: userAddress
        });

        return userAddress;
    }
}