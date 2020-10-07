import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilsService } from 'app/shared/services/utils.service';

@Component({
  selector: 'app-input-radio-group',
  templateUrl: './input-radio-group.component.html',
  styleUrls: ['./input-radio-group.component.scss'],
})
export class InputRadioGroupComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Input() formcontrolname: string;
  @Input() label: string;
  @Input() radios: object[];
  @Input() disabled = false;
  @Input() checked = false;
  @Input() displayField: string;
  @Input() valueField: string;
  @Input() layout: 'row' | 'column' = 'row';

  constructor(
    private _utilsService: UtilsService,
  ) { }

  ngOnInit(): void {
  }

  setValue(event): void {
    if (this.formGroup) {
      this.formGroup.get(this.formcontrolname).setValue(event.value);
    }
  }

  checkRequired(): boolean {
    if (this.formGroup) {
      return this._utilsService.hasRequiredField(this.formGroup.get(this.formcontrolname));
    }
  }
}
