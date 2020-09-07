import { CityInterface } from './city.interface';

export interface FactoryInterface {
    readonly idFactory?: number;
    readonly name?: string;
    readonly address?: string;
    readonly neighborhood?: string;
    readonly cep?: string;
    readonly state?: string;
    readonly cnpj?: string;
    readonly latitude?: string;
    readonly longitude?: string;
    readonly perimeter?: string;
    readonly active?: boolean;
    readonly city?: CityInterface;
}
