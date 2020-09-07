import { Factory } from './factory.model';

export class CheckListItems {
    idCheckListItem?: number;
    factory?: Factory;
    type?: string;
    description?: string;
    required?: boolean;
    active?: boolean;
}
