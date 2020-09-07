import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuseDirectivesModule } from '@fuse/directives/directives';
import { SharedModule } from 'app/shared/shared.module';
import { FormComponent } from './form/form.component';
import { ViewComponent } from './view/view.component';
import { FilterComponent } from 'app/shared/components/several-components/filter/filter.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'index' },
  { path: 'index', component: ViewComponent },
  { path: 'new', component: FormComponent },
  { path: ':id/edit', component: FormComponent },
  { path: ':id/view', component: FormComponent },
];

@NgModule({
  declarations: [
    ViewComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    FuseDirectivesModule
  ],
  entryComponents: [FilterComponent],
})
export class ShippingCompanyModule { }
