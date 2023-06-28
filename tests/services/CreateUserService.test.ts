import { CreateUserService } from '../../src/services/CreateUserService';
import { FakeUserRepository } from '../fakes/FakeUserRepository';
import ServiceError from '../../src/errors/ServiceError';

let fakeUserRepository: FakeUserRepository;
let createUserService: CreateUserService;

describe('CreateUserService', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        createUserService = new CreateUserService(fakeUserRepository);
    });

    it('should not accept a client user without cpf', () => {
        const user = {
            type: 'client' as 'client' | 'supplier',
            name: 'John Doe',
            email: 'john@doe.com',
            phone: '11947588253',
            cellphone: '08376586599',
        };

        expect(createUserService.execute(user)).rejects.toBeInstanceOf(ServiceError);
        expect(createUserService.execute(user)).rejects.toHaveProperty('message', 'CPF is required for clients!');
    });

    it('should not accept a client user with invalid cpf', () => {
        const user = {
            type: 'client' as 'client' | 'supplier',
            name: 'John Doe',
            email: 'john@doe.com',
            phone: '11947588253',
            cellphone: '11947588253',
            cpf: 'wrong-cpf'
        };

        expect(createUserService.execute(user)).rejects.toBeInstanceOf(ServiceError);
        expect(createUserService.execute(user)).rejects.toHaveProperty('message', 'CPF must have only numbers!');
    });

    it('should not accept a client user with an already registered cpf', async () => {
        const user = {
            type: 'client' as 'client' | 'supplier',
            name: 'John Doe',
            email: 'john@doe.com',
            phone: '11947588253',
            cellphone: '11947588253',
            cpf: '08376586599'
        };

        await createUserService.execute(user);

        expect(createUserService.execute(user)).rejects.toBeInstanceOf(ServiceError);
        expect(createUserService.execute(user)).rejects.toHaveProperty('message', 'CPF already registered!');

    });

    it('should not accept a supplier user without cnpj', () => {
        const user = {
            type: 'supplier' as 'client' | 'supplier',
            name: 'John Doe',
            email: 'john@doe.com',
            phone: '11947588253',
            cellphone: '11947588253',
        };

        expect(createUserService.execute(user)).rejects.toBeInstanceOf(ServiceError);
        expect(createUserService.execute(user)).rejects.toHaveProperty('message', 'CNPJ is required for suppliers!');
    });

    it('should not accept a supplier user with invalid cnpj', () => {
        const user = {
            type: 'supplier' as 'client' | 'supplier',
            name: 'John Doe',
            email: 'john@doe.com',
            phone: '11947588253',
            cellphone: '11947588253',
            cnpj: 'wrong-cnpj'
        };

        expect(createUserService.execute(user)).rejects.toBeInstanceOf(ServiceError);
        expect(createUserService.execute(user)).rejects.toHaveProperty('message', 'CNPJ must have only numbers!');

    });

    it('should not accept a supplier user with an already registered cnpj', async () => {
        const user = {
            type: 'supplier' as 'client' | 'supplier',
            name: 'John Doe',
            email: 'john@doe.com',
            phone: '11947588253',
            cellphone: '11947588253',
            cnpj: '00000000000191'
        };

        await createUserService.execute(user);

        expect(createUserService.execute(user)).rejects.toBeInstanceOf(ServiceError);
        expect(createUserService.execute(user)).rejects.toHaveProperty('message', 'CNPJ already registered!');

    });

    it('should not accept a supplier user with an already registered email', async () => {
        const user = {
            type: 'supplier' as 'client' | 'supplier',
            name: 'John Doe',
            email: 'john@doe.com',
            phone: '11947588253',
            cellphone: '11947588253',
            cnpj: '00000000000191'
        };

        await createUserService.execute(user);

        const user2 = {
            type: 'supplier' as 'client' | 'supplier',
            name: 'John Doe',
            email: 'john@doe.com',
            phone: '11947588253',
            cellphone: '11947588253',
            cnpj: '00000000000192'
        };

        expect(createUserService.execute(user2)).rejects.toBeInstanceOf(ServiceError);
        expect(createUserService.execute(user2)).rejects.toHaveProperty('message', 'Email already registered!');

    });

    it('should create user with valid data', async () => {

        const user = {
            type: 'supplier' as 'client' | 'supplier',
            name: 'John Doe',
            email: 'john@doe.com',
            phone: '11947588253',
            cellphone: '11947588253',
            cnpj: '00000000000192'
        };

        const createdUser = await createUserService.execute(user);

        expect(createdUser).toHaveProperty('id');
        expect(createdUser).toHaveProperty('name', user.name);
        expect(createdUser).toHaveProperty('email', user.email);
        expect(createdUser).toHaveProperty('phone', user.phone);
        expect(createdUser).toHaveProperty('cellphone', user.cellphone);
        expect(createdUser).toHaveProperty('cnpj', user.cnpj);

    });

});