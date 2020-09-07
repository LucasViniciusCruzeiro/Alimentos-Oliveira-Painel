import { AbstractControl } from '@angular/forms';

export function CnhValidator(control: AbstractControl) {

    if (control.value) {
        const strCNH = control.value;

        const invalidCNH = ['11111111111', '22222222222', '33333333333', '44444444444', '55555555555',
                            '66666666666', '77777777777', '88888888888', '99999999999', '00000000000'];

        if (invalidCNH.includes(strCNH)) {
            return { cnh: true };
        }

        let acumulador = 0;
        let inc = 2;
        for (let i = 0; i < 9; i++) {
            acumulador += (Math.abs(parseInt(strCNH.substring(i, i + 1), 10))) * inc;
            inc++;
        }

        let resto = acumulador % 11;
        let digito1 = 0;
        if (resto > 1) {
            digito1 = 11 - resto;
        }
        acumulador = digito1 * 2;
        inc = 3;
        for (let i = 0; i < 9; i++) {
            acumulador += (Math.abs(parseInt(strCNH.substring(i, i + 1), 10))) * inc;
            inc++;
        }

        resto = acumulador % 11;
        let digito2 = 0;
        if (resto > 1) {
            digito2 = 11 - resto;
        }
        if (digito1 !== Math.abs(parseInt(strCNH.substring(9, 10), 10))
                || digito2 !== Math.abs(parseInt(strCNH.substring(10, 11), 10))) {
            return { cnh: true };
        }

        return null;

    }

    return { cnh: true };

}