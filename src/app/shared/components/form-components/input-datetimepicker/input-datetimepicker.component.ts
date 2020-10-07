import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilsService } from 'app/shared/services/utils.service';

@Component({
  selector: 'app-input-datetimepicker',
  templateUrl: './input-datetimepicker.component.html',
  styleUrls: ['./input-datetimepicker.component.scss'],
})
export class InputDatetimepickerComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Input() label: string;
  @Input() formcontrolname: string;
  @Input() placeholder = 'DD-MM-AAAA HH:mm';
  @Input() readonly = false;
  @Input() cleanInput: string;

  @Output() changeValue = new EventEmitter();

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
    this.changeValue.emit(event);
  }

}
