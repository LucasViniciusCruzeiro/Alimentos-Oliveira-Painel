import { ChangeDetectionStrategy, Component, Input, OnInit  } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilsService } from 'app/shared/services/utils.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-input-text-cpf-cnpj',
  templateUrl: './input-text-cpf-cnpj.component.html',
  styleUrls: ['./input-text-cpf-cnpj.component.scss'],
})
export class InputTextCpfCnpjComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Input() formcontrolname: string;
  @Input() placeholder = 'CPF/CNPJ';
  @Input() label = 'CPF/CNPJ';
  @Input() iconName: string;
  @Input() maxLength: number;
  @Input() personType: string;

  mask = '';
  formated = false;

  constructor(
    private _utilsService: UtilsService,
  ) { }

  ngOnInit(): void {
    this.onChange();
  }

  checkRequired(): boolean {
    return this._utilsService.hasRequiredField(this.formGroup.get(this.formcontrolname));
  }

  onChange() {
    this.formGroup.get(this.formcontrolname).valueChanges.subscribe(data => {
      if (this.personType === 'J' || data.length === 14) {
        this.mask = '00.000.000/0000-00';
      } else if (this.personType === 'F' || data.length === 11) {
        this.mask = '000.000.000-00';
      }
    });
  }
}
