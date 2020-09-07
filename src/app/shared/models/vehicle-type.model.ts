import { Factory } from './factory.model';

export class VehicleType {
    idVehicleType?: number;
    description?: string;
    maximumWeightPerAxle?: string;
    totalGrossPrice?: string;
    totalGrossPriceTolerance?: string;
    capacity?: string;
    maxLength?: string;
    quantityOfTheKit?: number;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    factory?: Factory;
}
