import { CreateUserAddressService } from "../../src/services/CreateUserAddressService";
import { FakeUsersAddressRepository } from "../fakes/FakeUserAddressRepository";
import { FakeUserRepository } from "../fakes/FakeUserRepository";

let fakeUserRepository: FakeUserRepository;
let fakeUserAddressRepository: FakeUsersAddressRepository;
let createUserAddressService: CreateUserAddressService;

describe('CreateUserAddressService', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeUserAddressRepository = new FakeUsersAddressRepository();
        createUserAddressService = new CreateUserAddressService(fakeUserRepository, fakeUserAddressRepository);
    });

    it('should not accept an invalid user id', () => {
        const address = {
            street: 'Rua 1',
            city: 'São Paulo',
            complement: 'Casa',
            neighborhood: 'Jardim Paulista',
            number: 1,
            state: 'SP',
            zipCode: '12345678',
            userId: 'wrong-id'
        };

        expect(createUserAddressService.execute(address)).rejects.toHaveProperty('message', 'User not found on address creation!');
    });

    it('should not accept an invalid zip code', async () => {
        const user = {
            type: 'client' as 'client' | 'supplier',
            name: 'John Doe',
            email: 'john@doe.com',
            phone: '11947588253',
            cellphone: '11947588253',
            cnpj: '00000000000192'
        };

        const createdUser = await fakeUserRepository.create(user);

        const address = {
            street: 'Rua 1',
            city: 'São Paulo',
            complement: 'Casa',
            neighborhood: 'Jardim Paulista',
            number: 1,
            state: 'SP',
            zipCode: 'wrong-zip-code',
            userId: createdUser.id!
        };

        expect(createUserAddressService.execute(address)).rejects.toHaveProperty('message', 'Zip code must have only numbers!');
    });


    it('should accept a valid user id', async () => {
        const user = {
            type: 'client' as 'client' | 'supplier',
            name: 'John Doe',
            email: 'john@doe.com',
            phone: '11947588253',
            cellphone: '11947588253',
            cnpj: '00000000000192'
        };

        const createdUser = await fakeUserRepository.create(user);

        const address = {
            street: 'Rua 1',
            city: 'São Paulo',
            complement: 'Casa',
            neighborhood: 'Jardim Paulista',
            number: 1,
            state: 'SP',
            zipCode: '12345678',
            userId: createdUser.id!
        };

        const createdAddress = await createUserAddressService.execute(address);

        expect(createdAddress).toHaveProperty('id');
        expect(createdAddress).toHaveProperty('street', address.street);
        expect(createdAddress).toHaveProperty('city', address.city);
        expect(createdAddress).toHaveProperty('complement', address.complement);
        expect(createdAddress).toHaveProperty('neighborhood', address.neighborhood);
        expect(createdAddress).toHaveProperty('number', address.number);
        expect(createdAddress).toHaveProperty('state', address.state);
        expect(createdAddress).toHaveProperty('zipCode', address.zipCode);
        expect(createdAddress).toHaveProperty('userId', address.userId);

    });


});