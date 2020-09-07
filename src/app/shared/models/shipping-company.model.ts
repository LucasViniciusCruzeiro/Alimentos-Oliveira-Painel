import { Factory } from './factory.model';
import { City } from './city.model';

export class ShippingCompany {
    idShippingCompany?: number;
    name?: string;
    address?: string;
    neighborhood?: string;
    zipCode?: number;
    state?: string;
    personType?: string;
    document?: number;
    email?: string;
    fixPhone?: number;
    phoneNumber?: number;
    active?: boolean;
    factory?: Factory;
    city?: City;
}
