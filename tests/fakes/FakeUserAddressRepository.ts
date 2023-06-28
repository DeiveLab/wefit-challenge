import { UserAddress } from "../../src/entities/UserAddress";
import { randomUUID } from "node:crypto";
import { IUsersAddressRepository } from "../../src/repositories/IUsersAddressRepository";


export class FakeUsersAddressRepository implements IUsersAddressRepository {
    private usersAddress: UserAddress[] = [];

    async create({ city, neighborhood, number, state, street, userId, zipCode, complement }: UserAddress): Promise<UserAddress> {

        this.usersAddress.push({
            id: randomUUID(),
            city, 
            neighborhood, 
            number, 
            state, 
            street, 
            userId, 
            zipCode, 
            complement
        });

        return this.usersAddress[this.usersAddress.length - 1];
    }
}