import { StateInterface } from './state.interface';

export interface CityInterface {
    readonly idCity?: number;
    readonly name?: string;
    readonly createdAt?: string;
    readonly updatedAt?: string;
    readonly state?: StateInterface;
}
