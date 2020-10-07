import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view/view.component';
import { FormComponent } from './form/form.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { FuseDirectivesModule } from '@fuse/directives/directives';
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
export class ClientModule { }
