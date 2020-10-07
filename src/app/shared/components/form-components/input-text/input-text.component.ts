import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilsService } from 'app/shared/services/utils.service';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
})
export class InputTextComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Input() formcontrolname: string;
  @Input() placeholder: string;
  @Input() label: string;
  @Input() iconName: string;
  @Input() maxLength: number;
  @Input() mask: string;

  constructor(
    private _utilsService: UtilsService,
  ) { }

  ngOnInit(): void {
    this.onTreatmentMask();
  }

  checkRequired(): boolean {
    return this._utilsService.hasRequiredField(this.formGroup.get(this.formcontrolname));
  }

  onChange(value): void {
    this.onTreatmentMask();
    if (value.length >= this.maxLength) {
      value = value.substring(0, (this.maxLength));
    }
    if (value.trim() === '') {
      value = '';
    }
    return value;
  }

  onTreatmentMask(): string {
    if (this.formcontrolname === 'cnpj') {
      return this.mask = '00.000.000/0000-00';
    } else if (this.formcontrolname === 'cpf') {
        return this.mask = '000.000.000-00';
      }
  }

}
