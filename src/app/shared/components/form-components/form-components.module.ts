import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'app/shared/material/material.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MaterialFileInputModule } from 'ngx-material-file-input';

import { ErrorsComponent } from './errors/errors.component';
import { InputAutocompleteComponent } from './input-autocomplete/input-autocomplete.component';
import { InputDatepickerComponent } from './input-datepicker/input-datepicker.component';
import { InputFileComponent } from './input-file/input-file.component';
import { InputNumberComponent } from './input-number/input-number.component';
import { InputRadioGroupComponent } from './input-radio-group/input-radio-group.component';
import { InputSelectMultipleComponent } from './input-select-multiple/input-select-multiple.component';
import { InputSelectComponent } from './input-select/input-select.component';
import { InputTagComponent } from './input-tag/input-tag.component';
import { InputTextComponent } from './input-text/input-text.component';
import { InputToggleComponent } from './input-toggle/input-toggle.component';
import { TextAreaComponent } from './text-area/text-area.component';
import { NgxMaskModule } from 'ngx-mask';
import { InputTextCpfCnpjComponent } from './input-text-cpf-cnpj/input-text-cpf-cnpj.component';
import { InputTextCategoryCnhComponent } from './input-text-category-cnh/input-text-category-cnh.component';

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
    InputFileComponent,
    InputRadioGroupComponent,
    InputTextCpfCnpjComponent,
    InputTextCategoryCnhComponent
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
    InputFileComponent,
    InputRadioGroupComponent,
    InputTextCpfCnpjComponent,
    InputTextCategoryCnhComponent
  ]
})
export class FormComponentsModule { }
