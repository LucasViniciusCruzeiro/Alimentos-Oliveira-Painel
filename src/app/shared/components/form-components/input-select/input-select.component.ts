import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UtilsService } from 'app/shared/services/utils.service';
import { ReplaySubject, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss']
})
export class InputSelectComponent implements OnInit, OnDestroy {

  @Input() data: Array<any>;
  @Input() displayField: string;
  @Input() formGroup: FormGroup;
  @Input() formcontrolname: string;
  @Input() label: string;
  @Input() iconName: string;
  @Input() noEntriesFoundLabel = 'Nada encontrado';
  @Input() refreshApi = false;
  @Input() searchField: string;
  @Input() valueField: string;

  @Output() searchOnApi = new EventEmitter();
  @Output() select = new EventEmitter();

  public dataFilterCtrl: FormControl = new FormControl();
  public filteredData: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  protected _onDestroy = new Subject<void>();

  constructor(
    private _cdr: ChangeDetectorRef,
    private _utilsService: UtilsService
  ) { }

  ngOnInit() {
    this.dataFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy), debounceTime(500)).subscribe(
      (data) => {
        if (this.refreshApi) {
          this.searchOnApi.emit(data);
        }
        this.filterData();
      });
  }

  ngOnChanges() {
    if (this.data) {
      this.filteredData.next(this.data);
    }
  }

  checkRequired() {
    return this._utilsService.hasRequiredField(this.formGroup.get(this.formcontrolname));
  }

  protected filterData() {
    if (!this.data) {
      return;
    }

    let search = this.dataFilterCtrl.value;

    if (!search) {
      this.filteredData.next(this.data.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredData.next(
      this.data.filter(item => item[this.searchField].toLowerCase().includes(search))
    );

    this._cdr.detectChanges();
  }

  onSelectChange(value) {
    this.select.emit(value)
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

}
