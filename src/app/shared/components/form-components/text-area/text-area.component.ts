import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilsService } from 'app/shared/services/utils.service';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
})
export class TextAreaComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Input() formcontrolname: string;
  @Input() matAutosizeMinRows = '4';
  @Input() matAutosizeMaxRows = '4';

  @Input() label: string;
  @Input() placeholder: string;
  @Input() maxLength: number;
  @Input() disabled = false;

  constructor(
    private _utilsService: UtilsService,
  ) { }

  ngOnInit(): void {
    if (this.disabled) {
      this.formGroup.get(this.formcontrolname).disable();
    }
  }

  onChange(value): void {
    if (value.length >= this.maxLength) {
      value = value.substring(0, (this.maxLength));
    }
    if (value.trim() === '') {
      value = '';
    }
    return value;
  }

  checkRequired(): boolean {
    return this._utilsService.hasRequiredField(this.formGroup.get(this.formcontrolname));
  }
}
