import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilsService } from 'app/shared/services/utils.service';

@Component({
  selector: 'app-input-number-latitude-longitude',
  templateUrl: './input-number-latitude-longitude.component.html',
  styleUrls: ['./input-number-latitude-longitude.component.scss'],
})
export class InputNumberLatitudeLongitudeComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Input() formcontrolname: string;
  @Input() mask: any;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() min: number;
  @Input() max: number;

  validator = 'Formato de dado inválido';

  constructor(
    private _utilsService: UtilsService,
  ) { }

  ngOnInit(): void {
  }

  checkRequired(): boolean {
    return this._utilsService.hasRequiredField(this.formGroup.get(this.formcontrolname));
  }

  onChange(): void {

    this.formGroup.get(this.formcontrolname).valueChanges.subscribe(data => {
      let value = data;

      if (value === null) {
        this.formGroup.get(this.formcontrolname).setValue('');
      } else if (value > this.max) {
        return this.formGroup.get(this.formcontrolname).setValue(this.max);
      } else if (value < this.min) {
        return this.formGroup.get(this.formcontrolname).setValue(this.min);
      } else if (value === 0 && value !== '') {
        return this.formGroup.get(this.formcontrolname).setValue(0);
      }

      if (value) {
        value = value.toString();
  
        if (value.indexOf(',') > 0) {
          value = value.replace(',', '.');
        }
  
        let qntDecimal = value.slice(value.indexOf('.') + 1, value.length);
        const qntInteger = value.slice(0, value.indexOf('.') + 1);
  
        if (qntDecimal.length > 10) {
          qntDecimal = qntDecimal.substring(0, (qntDecimal.length - (qntDecimal.length - 10)));
          return this.formGroup.get(this.formcontrolname).setValue(parseFloat(qntInteger + '' + qntDecimal));
        }
      }
    });

    }
}
