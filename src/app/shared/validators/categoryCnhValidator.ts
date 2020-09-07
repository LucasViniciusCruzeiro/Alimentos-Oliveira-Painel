import { AbstractControl } from '@angular/forms';

export function CategoryCnhValidator(control: AbstractControl) {
    const categoryCnh = control.value;
    if (categoryCnh && (categoryCnh.length === 1 || categoryCnh.length === 2)) {
        return null;        
    }
    return { categoryCnh: true };
}
