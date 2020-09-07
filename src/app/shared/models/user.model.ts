import { ShippingCompany } from './shipping-company.model';
import { Profile } from './profile.model';
import { Factory } from './factory.model';

export class User {
    idUser?: number;
    name?: string;
    email?: string;
    sector?: string;
    profile?: Profile;
    redefinePassword?: boolean;
    active?: boolean;
    shippingCompany?: ShippingCompany;
    factories?: string[];
    profiles?: Profile;
}
