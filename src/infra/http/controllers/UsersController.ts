import { Request, Response } from 'express';
import { createUserSchema } from '../../../requests/createUser.request';
import { ZodError } from 'zod';
import { CreateUserService } from '../../../services/CreateUserService';
import { CreateUserAddressService } from '../../../services/CreateUserAddressService';
import ServiceError from '../../../errors/ServiceError';
import { container } from '../../container';

export class UsersController {
    async create(req: Request, res: Response) {
        try {
            const { 
                body: { 
                    cpf, 
                    cnpj, 
                    type, 
                    phone, 
                    name, 
                    email, 
                    cellphone, 
                    address: {
                        street,
                        city,
                        complement,
                        neighborhood,
                        number,
                        state,
                        zipCode
                    }
                } 
            } = await createUserSchema.parseAsync(req);

            const createUser = container.resolve(CreateUserService);
            const createUserAddress = container.resolve(CreateUserAddressService);

            const user = await createUser.execute({ cpf, cnpj, type, phone, name, email, cellphone });

            await createUserAddress.execute({ 
                street,
                city,
                complement,
                neighborhood,
                number,
                state,
                zipCode, 
                userId: user.id!
            });

            return res.status(201).json(user);
        } catch (error) {
            console.log(error);
            
            if(error instanceof ZodError || error instanceof ServiceError)
                return res.status(400).json({ error: error.message });

            return res.status(500).json({ error: 'Internal error!' });
        }
        
    }
}