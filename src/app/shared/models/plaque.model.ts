import { Factory } from './factory.model';
import { ShippingCompany } from './shipping-company.model';
import { VehicleType } from './vehicle-type.model';

export class Plaque {
    createdAt?: Date;
    updatedAt?: Date;
    idPlaque?: number;
    plaque?: string;
    description?: string;
    numberOfMouths?: number;
    shakingModel?: string;
    productType?: string;
    registrationType?: string;
    active?: boolean;
    factory?: Factory;
    shippingCompany?: ShippingCompany;
    vehicleType?: VehicleType;
}
