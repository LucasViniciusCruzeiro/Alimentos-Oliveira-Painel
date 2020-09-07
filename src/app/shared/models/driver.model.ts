import { Factory } from './factory.model';
import { City } from './city.model';

export class Driver {
    idDriver?: number;
    name?: string;
    email?: string;
    phoneNumber?: string;
    cellPhoneNumber?: string;
    cpf?: string;
    cnh?: string;
    birthDate?: Date;
    dateValidity?: Date;
    category?: string;
    active?: boolean;
    zipCode?: string;
    publicPlace?: string;
    neighborhood?: string;
    factory?: Factory;
    city?: City;
}
