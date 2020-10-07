import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorIntl } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'app/shared/material/material.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { DataTableComponent } from './data-table/data-table.component';
import { getPtPaginatorIntl } from './data-table/pt-paginator-intl';
import { FilterComponent } from './filter/filter.component';
import { HeaderComponent } from './header/header.component';

import { FormComponentsModule } from 'app/shared/components/form-components/form-components.module';


@NgModule({
  declarations: [
    HeaderComponent,
    DataTableComponent,
    FilterComponent,
  ],
  imports: [
    DragDropModule,
    CommonModule,
    FlexLayoutModule,
    FormComponentsModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMatSelectSearchModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTabsModule,
    MatTooltipModule,
    MatRippleModule,
  ],
  exports: [
    HeaderComponent,
    DataTableComponent,
    FilterComponent,
  ],
  providers: [ { provide: MatPaginatorIntl, useValue: getPtPaginatorIntl() } ],
  entryComponents: [ ],
})
export class SeveralComponentsModule { }
