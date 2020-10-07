import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss'],
})
export class ErrorsComponent implements OnInit {

  @Input() formGroup;
  @Input() formcontrolname;

  constructor() { }

  ngOnInit(): void {
    this.formGroup.get(this.formcontrolname);
  }

  getErrorMessage(): string {
    const control = this.formGroup.get(this.formcontrolname);
    return control.hasError('passwordsNotMatching') ? 'Senhas não são iguais' :
        control.hasError('email') ? 'Email inválido' :
          control.hasError('maxlength') ? 'Número de caracteres ultrapassados' :
            control.hasError('minlength') ? 'Número de caracteres não atingido' :
              control.hasError('max') ? 'Valor maior que o permitido' :
                control.hasError('min') ? 'Valor menor que o permitido' :
                  control.hasError('pattern') ? 'Campo inválido' :
                    control.hasError('invalid') ? 'Campo inválido' :
                      control.hasError('cnpj') ? 'CNPJ inválido' :
                        control.hasError('cpf') ? 'CPF inválido' :
                          control.hasError('blank') ? 'Existe um espaço no ínicio do campo' :
                            control.hasError('requiredFileType') ? 'Arquivo inválido' :
                              control.hasError('nonzero') ? 'Valor 0 não é aceito' :
                                control.hasError('document') ? 'CPF/CNPJ Inválido' :
                                  control.hasError('cnh') ? 'Número da CNH Inválida' :
                                    control.hasError('birthDate') ? 'Data de Nascimento Inválida' :
                                      control.hasError('DTPRODUC') ? 'Data de Produção Inválida' :
                                        control.hasError('DTENTREG') ? 'Data de Entrega Inválida' :
                                          control.hasError('QTVLLBPR') ? 'Volume a ser liberado deve ser positivo e menor ou igual ao Saldo pedido' :
                                            control.hasError('dateValidity') ? 'CNH está vencida! Verificar Data de Validade!' :
                                              control.hasError('integrationDate') ? 'Data de Integração inválida' :
                                                control.hasError('matDatepickerParse') ? 'Data Informada Inválida' :
                                                  control.hasError('zipCode') ? 'CEP Inválido' :
                                                    control.hasError('Mask error') ? 'Valor Informado Inválido' :
                                                      control.hasError('required') ? 'Dados obrigatórios não informados' :
                                                        '';
  }
}
