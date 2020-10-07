import { Column } from './column';

export class Config {
    private _columns: Column[];
    private _total: number;

    constructor(columns: Column[], total: number) {
        this._columns = columns;
        this._total = total;
    }

    get columns(): Column[] {
        return this._columns;
    }

    set columns(value: Column[]) {
        this._columns = value;
    }

    get total(): number {
        return this._total;
    }

    set total(value: number) {
        this._total = value;
    }

    unshift(obj: Column) {
        if (this._columns.findIndex((val) => val.columnRef == obj.columnRef) == -1) {
            this._columns.unshift(obj);
        }
    }

    push(obj: Column) {
        if (this._columns.findIndex((val) => val.columnRef == obj.columnRef) == -1) {
            this._columns.push(obj);
        }
    }
}
