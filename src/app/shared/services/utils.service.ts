import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';

import { SwalService } from './swal.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private _swalService: SwalService
  ) { }

  formIsValid(form: FormGroup): boolean {
    if (form.valid) {
      return true;
    } else {
      this.markFormTouched(form);
      this._swalService.error('Ops', 'Existem campos que não foram preenchidos adequadamente!');
      return false;
    }
  }

  hasRequiredField(abstractControl: AbstractControl): boolean {
    if (abstractControl.validator) {
      const validator = abstractControl.validator({} as AbstractControl);
      if (validator && validator.required) {
        return true;
      }
    }
    return false;
  }

  setValuesForm(form: FormGroup, item: any, exceptions = []): void {
    const keys = Object.keys(form.getRawValue());
    for (let i = 0; i < keys.length; i++) {
      if (!(exceptions.includes(keys[i]))) {
        if (form.get(keys[i])) {
          form.get(keys[i]).setValue(item[keys[i]]);
        }
      }
    }
  }

  enableForm(form: FormGroup, exceptions: Array<string>): void {
    const keys = Object.keys(form.getRawValue());

    for (let i = 0; i < keys.length; i++) {
      if (!(exceptions.includes(keys[i]))) {
        form.get(keys[i]).enable();
      }
    }
  }

  disableForm(form: FormGroup, exceptions: Array<string>) {
    const keys = Object.keys(form.getRawValue());

    for (let i = 0; i < keys.length; i++) {
      if (!(exceptions.includes(keys[i]))) {
        form.get(keys[i]).disable();
      }
    }
  }

  // formIsValid(form: FormGroup): boolean {
  //   if (form.valid) {
  //     return true;
  //   } else {
  //     this.markFormTouched(form);
  //     this._swalService.error('Ops', 'Existem campos que não foram preenchidos adequadamente!');
  //     return false;
  //   }
  // }

  markFormTouched(form: FormGroup): void {
    const keys = Object.keys(form.getRawValue());

    for (const key of keys) {
      form.get(key).markAsTouched();
    }
  }

  validateFileImage(file, required?) {
    if (file && typeof file.name == 'string') {
      const mimeType = file.type;
      if (mimeType.match(/image\/png/) || mimeType.match(/image\/jpg/) || mimeType.match(/image\/jpeg/)) {
        return true;
      } else {
        return false;
      }
    } else if (file && typeof file === 'string') {
      return true;
    } else if (required) {
      return false;
    } else {
      return true;
    }

  }

  validateFilePdf(file) {
    const mimeType = file.type;
    if (mimeType.match(/application\/pdf/)) {
      return true;
    } else {
      return false;
    }
  }

  validateFileZip(file) {
    const mimeType = file.type;
    if (mimeType.match(/application\/zip/) || mimeType.match(/application\/x-zip-compressed/)) {
      return true;
    } else {
      return false;
    }
  }

  momentToDate(date) {
    if (typeof date === 'object') {
      return moment(date).format('YYYY-MM-DD HH:mm:ss');
    } else {
      return date;
    }
  }

  checkDateIsBefore(date) {
    return moment(date).isBefore(moment());
	}

  formatDecimalValues(value, decimalPlaces): number {
    const wholePlaces = value.length - decimalPlaces;
    value = value.slice(0, wholePlaces) + '.' + value.slice(wholePlaces);

    return parseFloat(value);
  }
}
