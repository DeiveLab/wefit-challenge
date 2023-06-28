export class UserAddress {
    id?: string;
    userId: string;
    street: string;
    number: number;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;

    private constructor(userId: string, street: string, number: number, complement: string | undefined, neighborhood: string, city: string, state: string, zipCode: string) {
        this.userId = userId;
        this.street = street;
        this.number = number;
        this.complement = complement;
        this.neighborhood = neighborhood;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
    }

    static create({ userId, street, number, complement, neighborhood, city, state, zipCode }: UserAddress): UserAddress {
        return new UserAddress(userId, street, number, complement, neighborhood, city, state, zipCode);
    }
}