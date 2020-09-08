import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UtilsService } from 'app/shared/services/utils.service';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-input-select-multiple',
  templateUrl: './input-select-multiple.component.html',
  styleUrls: ['./input-select-multiple.component.scss']
})
export class InputSelectMultipleComponent implements OnInit, OnChanges, OnDestroy {

  @Input() formGroup: FormGroup;
  @Input() formcontrolname: string;

  @Input() data: Array<any>;
  @Input() displayField: string;
  @Input() label: string;
  @Input() noEntriesFoundLabel = 'Nada encontrado';
  @Input() placeholder: string;
  @Input() refreshApi = false;
  @Input() secondDisplayField: string;
  @Input() searchField: string;
  @Input() valueField: string;
  @Input() iconName: string;

  @Output() searchOnApi = new EventEmitter();
  @Output() changeSelect = new EventEmitter();

  public dataFilterCtrl: FormControl = new FormControl();

  public filteredData: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  protected _onDestroy = new Subject<void>();

  constructor(
    private _cdr: ChangeDetectorRef,
    private _utilsService: UtilsService
  ) { }

  ngOnInit() {
    this.listenSearch();
  }

  listenSearch() {
    this.dataFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
      this.filterData();
    });
  }

  protected filterData() {
    if (!this.data) { return; }

    let search = this.dataFilterCtrl.value;
    if (!search) {
      this.filteredData.next(this.data.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    if (this.refreshApi) {
      this.searchOnApi.emit(search);
    } else {
      this.filteredData.next(
        this.data.filter(item => item[this.searchField].toLowerCase().includes(search))
      );
    }

    this._cdr.detectChanges();
  }

  ngOnChanges() {
    if (this.data) {
      this.filteredData.next(this.data);
    }
  }

  checkRequired() {
    return this._utilsService.hasRequiredField(this.formGroup.get(this.formcontrolname));
  }

  onChangeSelect(event) {
    this.changeSelect.emit(event);
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
