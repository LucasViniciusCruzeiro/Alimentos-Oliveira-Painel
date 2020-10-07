export class Column {
    static TYPE_COMMOM = 'type_commom';
    static TYPE_IMAGE = 'type_image';
    static TYPE_ACTIONS = 'type_actions';
    static TYPE_STATUS = 'type_status';
    static TYPE_CHIP_BOOLEAN = 'type_chip_boolean';
    static TYPE_TIME_FROM_NOW = 'type_time_from_now';
    static TYPE_BUTTON = 'type_button';
    static TYPE_CHECKBOX = 'type_checkbox';
    static TYPE_INPUT = 'type_input';
    static TYPE_DATE = 'type_date';

    displayedColumn: string | string[];
    columnRef: string;
    nameColumn: string;
    type: string;
    sorted: boolean;
    config?: any;
    // tslint:disable-next-line: no-inferrable-types
    displayedOnMobile?: boolean = true;
}
