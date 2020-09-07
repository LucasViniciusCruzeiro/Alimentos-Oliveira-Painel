import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Column } from './column';
import { Config } from './config';

// import moment = require('moment');
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  animations: fuseAnimations,
})
export class DataTableComponent implements OnInit, OnChanges, OnDestroy {

  @Input() isViewed = true;
  @Input() isUpdated = true;
  @Input() isDeleted = true;
  @Input() isPaginated = true;

  @Input() data: Array<any>;
  @Input() config: Config;
  @Input() buttons: Array<any>;

  @Input() backgroundColor = '#fff';

  @Input() disableToggles = false;
  @Input() disableCheckboxes = false;
  @Input() disableInputs = false;

  @Input() startPageSize = 10;
  @Input() hidePageSize = false;
  @Input() hideActions = false;

  @Output() update = new EventEmitter();
  @Output() view = new EventEmitter();
  @Output() delete = new EventEmitter();

  @Output() refresh = new EventEmitter();
  @Output() changeStatus = new EventEmitter();
  @Output() changeChecked = new EventEmitter();
  @Output() directClick = new EventEmitter();
  @Output() buttonClick = new EventEmitter();

  @ViewChild(MatSort, null) sort: MatSort;
  @ViewChild(MatPaginator, null) paginator: MatPaginator;

  length = 0;
  pageSize = 10;
  pageIndex = 0;
  actualDirection;
  actualActive;
  pageSizeOptions = [10];
  isMobile = true;

  TYPE_COMMOM = Column.TYPE_COMMOM;
  TYPE_IMAGE = Column.TYPE_IMAGE;
  TYPE_ACTIONS = Column.TYPE_ACTIONS;
  TYPE_STATUS = Column.TYPE_STATUS;
  TYPE_CHIP_BOOLEAN = Column.TYPE_CHIP_BOOLEAN;
  TYPE_BUTTON = Column.TYPE_BUTTON;
  TYPE_CHECKBOX = Column.TYPE_CHECKBOX;
  TYPE_INPUT = Column.TYPE_INPUT;
  TYPE_DATE = Column.TYPE_DATE;

  private readonly MOBILE_BREAKPOINT: number = 768;
  private mobileColumnsConfiguration = [];

  dataSource;

  highlightedRows = [];

  @Input() shouldSelectRow: boolean;

  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _changesDetector: ChangeDetectorRef,
    // private _eventsService: EventsService
  ) {
    this.checkIfIsMobile(null);
  }

  @HostListener('window:resize', ['$event'])
  checkIfIsMobile(event?) {
    if (window.innerWidth <= this.MOBILE_BREAKPOINT) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  ngOnInit() {
    this.pageSize = this.startPageSize;
    this.pageSizeOptions = [this.startPageSize];

    // Check if is mobile
    this._start();
  }

  ngOnChanges() {
    this._start();
  }

  ngOnDestroy() {
    this._destroy$.next(true);
    this._destroy$.unsubscribe();
  }

  private _start() {
    if (this.data) {
      this.dataSource = new MatTableDataSource(this.data);
      this._changesDetector.detectChanges();

      this._startSort();
      this._startPaginator();
    }
  }

  private _startSort() {
    if (this.sort) {
      this.sort.sortChange.pipe(takeUntil(this._destroy$)).subscribe(
        data => {
          this.actualDirection = this.sort.direction;
          this.actualActive = this.sort.active;

          this.refresh.emit(
            {
              orderBy: this.sort.active,
              direction: this.sort.direction,
              pageIndex: this.paginator.pageIndex,
              pageSize: this.paginator.pageSize
            }
          );
        }
      );
    }
  }

  private _startPaginator() {
    if (this.config && this.config.total) {
      this.length = this.config.total;
      if (this.length > this.startPageSize) {
        if (this.startPageSize != 10) {
          this.pageSizeOptions = [this.startPageSize, 20, 30, 40];
        } else {
          this.pageSizeOptions = [10, 20, 30, 40];
        }
      }
    }
    
    if (this.paginator) {
      this.paginator.page.pipe(takeUntil(this._destroy$)).subscribe(
        data => {
          this.pageSize = this.paginator.pageSize;
          this.pageIndex = this.paginator.pageIndex;

          this.refresh.emit(
            {
              orderBy: this.sort.active ? this.sort.active : '',
              direction: this.sort.direction ? this.sort.direction : '',
              pageIndex: this.paginator.pageIndex,
              pageSize: this.paginator.pageSize
            }
          );
        }
      );
    }
  }

  getColumns() {
    if (this.isMobile) {
      return this.config.columns.filter(col => col.displayedOnMobile !== false).map((item) => item.columnRef);
    } else {
      return this.config.columns.map((item) => item.columnRef);
    }
  }

  getColumnValue(element, column: Column) {
    const { displayedColumn } = column;
    let value = element;

    if (Array.isArray(displayedColumn)) {
      value = element;
      for (const key of displayedColumn) {
        value = value[key];
      }
    } else {
      value = value[displayedColumn];
    }

    switch (column.type) {
      case Column.TYPE_IMAGE:
        if (!value) {
          return 'assets/images/ecommerce/product-image-placeholder.png';
        } else {
          return value;
        }
      case Column.TYPE_TIME_FROM_NOW: return moment(value, column.config).fromNow();
      default:
        return value;
    }
  }

  getColumnVisibility(element, column: Column) {
    const { notVisibleWhen } = column.config || { notVisibleWhen: null };

    if (!notVisibleWhen) {
      return true;
    }

    const val = element[notVisibleWhen];
    if (val != undefined || val != null) {
      return !val;
    } else {
      return true;
    }
  }

  viewItem(item) {
    if (this.isViewed) {
      this.view.emit(item);
    }
  }

  directClickEvent(item) {
    this.directClick.emit(item);
  }

  deleteItem(item) {
    if (this.isDeleted) {
      this.delete.emit(item);
    }
  }

  updateItem(item) {
    if (this.isUpdated) {
      this.update.emit(item);
    }
  }

  changeStatusItem(item, column) {
    item[column] = item[column] == 1 ? 0 : 1;

    this.changeStatus.emit(item);
  }

  changeCheckedItem(item, column) {
    this.changeChecked.emit(item);
  }

  callEvent(item, event) {
    // this._eventsService.getEvent(event).emit(item);
  }

  onButtonClick(event, item) {
    event.stopPropagation();
    this.buttonClick.emit(item);
  }

  selectRow(row) {
    if (!this.shouldSelectRow) { return; }
    this.highlightedRows = [];
    this.highlightedRows.push(row);
  }

  private toggleState(state: boolean | number) {
    if (typeof state === 'number') {
      return state == 1 ? 0 : 1;
    } else {
      return !state;
    }
  }
}
