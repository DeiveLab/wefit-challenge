import { User } from "../../src/entities/User";
import { IUsersRepository } from "../../src/repositories/IUsersRepository";
import { randomUUID } from 'node:crypto';

export class FakeUserRepository implements IUsersRepository {
    private users: User[] = [];

    async create({ cnpj, cpf, type, phone, name, email, cellphone }: User): Promise<User> {
        this.users.push({
            id: randomUUID(),
            cnpj, 
            cpf, 
            type, 
            phone, 
            name, 
            email, 
            cellphone 
        });

        return this.users[this.users.length - 1];
    }

    async findById(id: string): Promise<User | null> {
        const user = this.users.find(user => user.id === id);

        return user || null;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = this.users.find(user => user.email === email);

        return user || null;
    }

    async findByCpf(cpf: string): Promise<User | null> {
        const user = this.users.find(user => user.cpf === cpf);

        return user || null;
    }

    async findByCnpj(cnpj: string): Promise<User | null> {
        const user = this.users.find(user => user.cnpj === cnpj);

        return user || null;
    }
}