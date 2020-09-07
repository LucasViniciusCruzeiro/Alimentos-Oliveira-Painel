import { AbstractControl } from '@angular/forms';
import { isValidCEP } from '@brazilian-utils/brazilian-utils';

export function ZipCodeValidator(control: AbstractControl) {
    const zipCode = control.value;
    if (zipCode && isValidCEP(zipCode)) {
        return null;
    }
    return { zipCode: true };
}
