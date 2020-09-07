import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';

import { Filter } from './filter-type';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {

  result = [];

  @Input() config: Filter = new Filter([{}]);

  @Output() refresh = new EventEmitter();

  susbcription: Subscription;

  constructor() {
  }

  ngOnInit(): void { }

  onChange(value, returnParam): void {
    if (value instanceof moment) {
      value = moment(value).format('YYYY/MM/DD HH:mm:ss');
    }
    this.onRefresh({ [returnParam]: value });
  }

  onRefresh(filter): void {
    this.refresh.emit(filter);
  }

  ngOnDestroy(): void {
    if (this.susbcription) {
      this.susbcription.unsubscribe();
    }
  }

}
