export class Filter {
    public filters: Array<FilterType>;

    constructor(filters: Array<FilterType>) {
        this.filters = filters;
    }
}

export class FilterType {
    static TYPE_SELECT = 'type_select';
    static TYPE_MULTILPLE_SELECT = 'type_multiple_select';
    static TYPE_TOGGLE = 'type_toggle';
    static TYPE_DATE = 'type_date';
    static TYPE_INPUT = 'type_input';
}
