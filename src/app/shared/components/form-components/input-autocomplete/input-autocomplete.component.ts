import { ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilsService } from 'app/shared/services/utils.service';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-input-autocomplete',
  templateUrl: './input-autocomplete.component.html',
  styleUrls: ['./input-autocomplete.component.scss'],
})
export class InputAutocompleteComponent implements OnInit, OnChanges, OnDestroy {

  @Input() formGroup: FormGroup;
  @Input() formcontrolname: string;

  @Input() data: any[];
  @Input() valueField: string;
  @Input() imageField: string;
  @Input() textField: string;
  @Input() placeholder: string;
  @Input() searchField: string;

  public filteredData: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  private _isListening: Observable<any>;

  protected _destroy = new Subject<void>();

  constructor(
    private _utilsService: UtilsService,
    private _cdr: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this._start();
  }

  ngOnChanges() {
    this.filteredData.next(this.data);
    this._start();
  }

  private _start() {
    if (this.formGroup && this.formcontrolname && !this._isListening) {
      const control = this.formGroup.get(this.formcontrolname);
      this._isListening = control.valueChanges;
      this._isListening.pipe(takeUntil(this._destroy)).subscribe(
        data => {
          const filterValue = control.value ? control.value.toLowerCase() : '';

          if (!filterValue || filterValue == '') {
            this.filteredData.next(this.data.slice());
            return;
          }
          this.filteredData.next(
            this.data.filter(item => item[this.searchField].toLowerCase().includes(filterValue)),
          );

          this._cdr.detectChanges();
        },
      );
    }
  }

  checkRequired() {
    return this._utilsService.hasRequiredField(this.formGroup.get(this.formcontrolname));
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
