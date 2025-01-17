import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'app/shared/material/material.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MaterialFileInputModule } from 'ngx-material-file-input';

import { NgxMaskModule } from 'ngx-mask';
import { ErrorsComponent } from './errors/errors.component';
import { InputAutocompleteComponent } from './input-autocomplete/input-autocomplete.component';
import { InputDatepickerComponent } from './input-datepicker/input-datepicker.component';
import { InputDatetimepickerComponent } from './input-datetimepicker/input-datetimepicker.component';
import { InputEmailComponent } from './input-email/input-email.component';
import { InputFileComponent } from './input-file/input-file.component';
import { InputNumberLatitudeLongitudeComponent } from './input-number-latitude-longitude/input-number-latitude-longitude.component';
import { InputNumberComponent } from './input-number/input-number.component';
import { InputPasswordComponent } from './input-password/input-password.component';
import { InputRadioGroupComponent } from './input-radio-group/input-radio-group.component';
import { InputSelectMultipleComponent } from './input-select-multiple/input-select-multiple.component';
import { InputSelectComponent } from './input-select/input-select.component';
import { InputTagComponent } from './input-tag/input-tag.component';
import { InputTextCpfCnpjComponent } from './input-text-cpf-cnpj/input-text-cpf-cnpj.component';
import { InputTextComponent } from './input-text/input-text.component';
import { InputToggleComponent } from './input-toggle/input-toggle.component';
import { TextAreaComponent } from './text-area/text-area.component';

@NgModule({
  declarations: [
    ErrorsComponent,
    InputSelectComponent,
    InputTextComponent,
    InputAutocompleteComponent,
    InputSelectMultipleComponent,
    InputToggleComponent,
    InputTagComponent,
    TextAreaComponent,
    InputNumberComponent,
    InputDatepickerComponent,
    InputDatetimepickerComponent,
    InputFileComponent,
    InputRadioGroupComponent,
    InputTextCpfCnpjComponent,
    InputEmailComponent,
    InputPasswordComponent,
    InputNumberLatitudeLongitudeComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    FormsModule,
    MaterialFileInputModule,
    NgxMaskModule.forRoot(),

  ],
  exports: [
    ErrorsComponent,
    InputTextComponent,
    InputSelectComponent,
    InputAutocompleteComponent,
    InputSelectMultipleComponent,
    InputToggleComponent,
    InputTagComponent,
    TextAreaComponent,
    InputNumberComponent,
    InputDatepickerComponent,
    InputDatetimepickerComponent,
    InputFileComponent,
    InputRadioGroupComponent,
    InputTextCpfCnpjComponent,
    InputEmailComponent,
    InputPasswordComponent,
    InputNumberLatitudeLongitudeComponent,
  ],
})
export class FormComponentsModule { }
