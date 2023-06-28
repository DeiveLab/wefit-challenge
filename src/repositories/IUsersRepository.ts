import { User } from "../entities/User";
import { IBaseRepository } from "./IBaseRepository";

export interface IUsersRepository extends IBaseRepository<User> {
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findByCpf(cpf: string): Promise<User | null>;
    findByCnpj(cnpj: string): Promise<User | null>;
}