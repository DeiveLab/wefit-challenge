import { z } from "zod"

export const createUserSchema = z.object({
    body: z.object({
        type: z.enum(['client', 'supplier']),
        cnpj: z.string().length(14).optional(),
        cpf: z.string().length(11).optional(),
        name: z.string(),
        email: z.string().email().toLowerCase(),
        phone: z.string().min(11).max(14),
        cellphone: z.string().min(10).max(13),
        address: z.object({
            street: z.string(),
            number: z.coerce.number(),
            complement: z.string().optional(),
            neighborhood: z.string(),
            city: z.string(),
            state: z.string(),
            zipCode: z.string().length(8),
        })
    })
});