import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilsService } from 'app/shared/services/utils.service';

@Component({
  selector: 'app-input-text-cpf-cnpj',
  templateUrl: './input-text-cpf-cnpj.component.html',
  styleUrls: ['./input-text-cpf-cnpj.component.scss']
})
export class InputTextCpfCnpjComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Input() formcontrolname: string;

  @Input() placeholder = 'CPF/CNPJ';
  @Input() label = 'CPF/CNPJ';
  @Input() iconName: string;
  @Input() maxLength: number;

  mask = '';
  formated = false;
  
  constructor(
    private _utilsService: UtilsService
  ) { }

  ngOnInit(): void {
  }

  checkRequired(): boolean {
    return this._utilsService.hasRequiredField(this.formGroup.get(this.formcontrolname));
  }

  onChange(value) {
    if ((value.length > 14) || (this.formated === true)) {
      this.formated = false;
      return this.mask = '00.000.000/0000-00';
    } else {
      if (value.length === 14) {
        this.formated = true;
      }
      return this.mask = '000.000.000-00';
    }
  }
} 
