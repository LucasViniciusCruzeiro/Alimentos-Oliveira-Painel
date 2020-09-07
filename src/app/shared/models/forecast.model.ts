import { Factory } from './factory.model';

export class Forecasts {
    idForecast?: number;
    factory?: Factory;
    dailyLoadCapacity?: number;
    dailyTonCapacity?: number;
    initialDate?: Date;
    finalDate?: Date;
    active?: boolean;
}