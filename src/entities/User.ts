export class User {
    id?: string;
    cnpj?: string;
    cpf?: string;
    type: 'client' | 'supplier';
    name: string;
    email: string;
    phone: string;
    cellphone: string;

    private constructor(cnpj: string | undefined, cpf: string | undefined, type: 'client' | 'supplier', name: string, email: string, phone: string, cellphone: string) {
        this.cnpj = cnpj;
        this.cpf = cpf;
        this.type = type;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.cellphone = cellphone;
    }

    static create({ cnpj, cpf, type, name, email, phone, cellphone }: User): User {
        return new User(cnpj, cpf, type, name, email, phone, cellphone);
    }
}