import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilsService } from 'app/shared/services/utils.service';

@Component({
  selector: 'app-input-datepicker',
  templateUrl: './input-datepicker.component.html',
  styleUrls: ['./input-datepicker.component.scss'],
})
export class InputDatepickerComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Input() label: string;
  @Input() formcontrolname: string;
  @Input() placeholder = 'DD-MM-AAAA';
  @Input() readonly = false;
  @Input() initialDate = null;
  @Input() finalDate = null;
  @Input() cleanInput: string;

  @Output() changeValue = new EventEmitter();

  minDate = null;
  maxDate = null;

  constructor(
    private _utilsService: UtilsService,
  ) { }

  ngOnInit(): void {
  }

  checkRequired(formcontrolname): boolean {
    return this._utilsService.hasRequiredField(this.formGroup.get(formcontrolname));
  }

  resetField(): void {
    this.formGroup.get(this.formcontrolname).setValue(null);
    this.formGroup.get(this.formcontrolname).markAsUntouched();
  }

  verifyDate(event): void {
    if (this.finalDate) {
      if (this.finalDate._i) {
        const finDate = this.finalDate._i;
        this.maxDate = new Date(finDate.year, finDate.month, finDate.date);
      } else {
        this.maxDate = this.finalDate;
      }
    }
    if (this.initialDate) {
      if (this.initialDate._i) {
        const iniDate = this.initialDate._i;
        this.minDate = new Date(iniDate.year, iniDate.month, iniDate.date);
      } else {
        this.minDate = this.initialDate;
      }
    }
    this.changeValue.emit(event);
  }

}
