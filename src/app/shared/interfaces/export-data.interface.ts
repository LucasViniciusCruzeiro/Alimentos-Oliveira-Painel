interface ColumnInterface {
    title: string;
    dataKey: string;
}

export interface ExportDataInterface {
    columns: ColumnInterface[];
    data: any[];
}
