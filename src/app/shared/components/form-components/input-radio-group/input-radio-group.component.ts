import { Component, OnInit, Input } from '@angular/core';
import { UtilsService } from 'app/shared/services/utils.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-radio-group',
  templateUrl: './input-radio-group.component.html',
  styleUrls: ['./input-radio-group.component.scss']
})
export class InputRadioGroupComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Input() formcontrolname: string;
  @Input() label: string;
  @Input() radios: any[];
  @Input() editable = true;
  @Input() displayField: string;
  @Input() valueField: string;
  @Input() layout: 'row' | 'column' = 'row';

  constructor(
    private _utilsService: UtilsService
  ) { }

  ngOnInit(): void {
  }

  setValue(event): void {
    this.formGroup.get(this.formcontrolname).setValue(event.value);
  }

  checkRequired(): boolean {
    return this._utilsService.hasRequiredField(this.formGroup.get(this.formcontrolname));
  }
}
