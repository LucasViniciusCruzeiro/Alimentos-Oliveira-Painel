import { Client } from './client.model';
import { Product } from './product.model';

export class Sales {
    idSales?: number;
    dateSales?: Date;
    product?: Product;
    client?: Client;
    amount?: number;
    value?: number;
}
