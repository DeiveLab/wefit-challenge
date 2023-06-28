import { User } from "../../entities/User";
import { prisma } from "../../infra/db/PrismaClient";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepository implements IUsersRepository {
    async create({ cnpj, cpf, type, phone, name, email, cellphone }: User): Promise<User> {
        let user = User.create({ cnpj, cpf, type, phone, name, email, cellphone });

        user = await prisma.user.create({
            data: user
        }) as User;

        return user;
    }

    async findById(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        });

        return user as User;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                email: email.toLowerCase()
            }
        });

        return user as User;
    }

    async findByCpf(cpf: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                cpf
            }
        });

        return user as User;
    }

    async findByCnpj(cnpj: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                cnpj
            }
        });

        return user as User;
    }
}