import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorIntl } from '@angular/material';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'app/shared/material/material.module';

import { DataTableComponent } from './data-table/data-table.component';
import { getPtPaginatorIntl } from './data-table/pt-paginator-intl';
import { FilterComponent } from './filter/filter.component';
import { HeaderComponent } from './header/header.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';



@NgModule({
  declarations: [
    HeaderComponent,
    DataTableComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMatSelectSearchModule,
  ],
  exports: [
    HeaderComponent,
    DataTableComponent,
    FilterComponent
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getPtPaginatorIntl() }
]
})
export class SeveralComponentsModule { }
