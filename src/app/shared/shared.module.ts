import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormComponentsModule } from './components/form-components/form-components.module';
import { SeveralComponentsModule } from './components/several-components/several-components.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material/material.module';


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    FormComponentsModule,
    SeveralComponentsModule,
  ],
  exports: [
    FormComponentsModule,
    SeveralComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule
  ]
})
export class SharedModule { }
