import { inject, injectable } from "tsyringe";
import { UserAddress } from "../entities/UserAddress";
import ServiceError from "../errors/ServiceError";
import { stringHasOnlyNumbers } from "../utils/textValidators";
import { IUsersRepository } from "../repositories/IUsersRepository";

@injectable()
export class CreateUserAddressService {
    constructor(
        @inject('IUsersRepository') private usersRepository: IUsersRepository,
        @inject('IUsersAddressRepository') private usersAddressRepository: IUsersRepository
    ) { }

    async execute({ zipCode, city, neighborhood, number, state, street, userId, complement }: UserAddress) {
        const user = await this.usersRepository.findById(userId);

        if (!user)
            throw new ServiceError('User not found on address creation!');

        this.validateZipCode(zipCode);
        
        const userAddress = await this.usersAddressRepository.create({
            zipCode,
            city,
            neighborhood,
            number,
            state,
            street,
            userId,
            complement
        });

        return userAddress;
    }

    private validateZipCode(zipCode: string): void {
        if (!stringHasOnlyNumbers(zipCode))
            throw new ServiceError('Zip code must have only numbers!');
    }
}