import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';
import { CityService } from 'app/shared/services/city.service';
import { Filter, FilterType } from './filter-type';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit, OnDestroy {

  result = [];

  @Input() config: Filter = new Filter([{}]);

  @Output() refresh = new EventEmitter();

  susbcription: Subscription;

  constructor(
    private _cityService: CityService,
  ) { }

  ngOnInit(): void {
    this.config.filters.forEach((element: any) => {
      if (element.type === FilterType.TYPE_MULTILPLE_SELECT) {
        this.result.push(element.selected ? element.selected : '');
        return element;
      }
    });
  }

  getCities(idState): Observable<any> {
    return this._cityService.loadAll({ state: idState });
  }

  comboBoxStateCity(idState): void {
    this.config.filters.map(item => {
      if (item['returnParam'] === 'city') {
        this.getCities(idState).subscribe((result: any) => {
          item['data'] = result.data;
          item['disabled'] = false;
        });
      }
    });
  }

  onChange(value, returnParam): void {
    if (returnParam === 'state') {
      this.comboBoxStateCity(value);
    }

    if (value instanceof moment) {
      value = moment(value).format('YYYY-MM-DD');
    }
    this.onRefresh({ [returnParam]: value });
  }

  onRefresh(filter): void {
    filter = { ...filter, pageIndex: 0 };
    this.refresh.emit(filter);
  }

  compareObjects(o1: any, o2: any): boolean {
    if (o1 === o2.id ) {
      return true;
    } else {
      return false;
    }
  }

  ngOnDestroy(): void {
    if (this.susbcription) {
      this.susbcription.unsubscribe();
    }
  }

}
