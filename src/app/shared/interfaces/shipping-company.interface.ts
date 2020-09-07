import { FactoryInterface } from './factory.interface';
import { CityInterface } from './city.interface';

export interface ShippingCompanyInterface {
    readonly idShippingCompany?: number;
    readonly name?: string;
    readonly address?: string;
    readonly neighborhood?: string;
    readonly zipCode?: number;
    readonly state?: string;
    readonly personType?: string;
    readonly document?: number;
    readonly email?: string;
    readonly fixPhone?: number;
    readonly phoneNumber?: number;
    readonly active?: boolean;
    readonly factory?: FactoryInterface;
    readonly city?: CityInterface;
}
