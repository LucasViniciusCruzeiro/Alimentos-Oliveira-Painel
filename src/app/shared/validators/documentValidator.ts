import { AbstractControl } from '@angular/forms';
import { isValidCPF, isValidCNPJ } from '@brazilian-utils/brazilian-utils';

export function DocumentValidator(control: AbstractControl) {
    const document = control.value;
    if (document && (isValidCPF(document) || isValidCNPJ(document))) {
        return null;
    }
    return { document: true };
}
