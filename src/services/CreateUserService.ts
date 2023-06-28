import { inject, injectable } from "tsyringe";
import { User } from "../entities/User";
import ServiceError from "../errors/ServiceError";
import { IUsersRepository } from "../repositories/IUsersRepository";
import { stringHasOnlyNumbers } from "../utils/textValidators";

@injectable()
export class CreateUserService {
    constructor(
        @inject('IUsersRepository') private usersRepository: IUsersRepository
    ) { }

    async execute({ cpf, cnpj, type, cellphone, email, name, phone }: User) {
        if(type === 'client' && !cpf)
            throw new ServiceError('CPF is required for clients!');

        if(type === 'supplier' && !cnpj)
            throw new ServiceError('CNPJ is required for suppliers!');

        await this.validateByType(type, cpf, cnpj);

        await this.validateEmail(email);

        const user = this.usersRepository.create({
            cpf, 
            cnpj, 
            type, 
            cellphone, 
            email, 
            name, 
            phone 
        });

        return user;
    }

    private async validateByType(type: 'client' | 'supplier', cpf: string | undefined, cnpj: string | undefined): Promise<void> {
        switch(type) {
            case 'client':
                if(!cpf) throw new ServiceError('CPF is required for clients!');

                await this.validateCpf(cpf);

                break;
            case 'supplier':
                if(!cnpj) throw new ServiceError('CNPJ is required for suppliers!');

                await this.validateCnpj(cnpj);

                break;
        }
    }

    private async validateCpf(cpf: string): Promise<void> {
        const cpfExists = await this.usersRepository.findByCpf(cpf);

        if(cpfExists) throw new ServiceError('CPF already registered!');

        if(!stringHasOnlyNumbers(cpf)) throw new ServiceError('CPF must have only numbers!');
    }

    private async validateCnpj(cnpj: string): Promise<void> {
        const cnpjExists = await this.usersRepository.findByCnpj(cnpj);

        if(cnpjExists) throw new ServiceError('CNPJ already registered!');

        if(!stringHasOnlyNumbers(cnpj)) throw new ServiceError('CNPJ must have only numbers!');
    }

    private async validateEmail(email: string): Promise<void> {
        const emailExists = await this.usersRepository.findByEmail(email);

        if(emailExists) throw new ServiceError('Email already registered!');
    }

}