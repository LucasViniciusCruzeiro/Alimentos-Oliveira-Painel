import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuseDirectivesModule } from '@fuse/directives/directives';
import { SharedModule } from 'app/shared/shared.module';
import { FormComponent } from './form/form.component';
import { ViewComponent } from './view/view.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'index' },
  { path: 'index', component: ViewComponent },
  { path: 'new', component: FormComponent },
  { path: ':id/edit', component: FormComponent },
  { path: ':id/view', component: FormComponent },
];

@NgModule({
  declarations: [ViewComponent, FormComponent],
  imports: [
    CommonModule,
    SharedModule,
    FuseDirectivesModule,
    RouterModule.forChild(routes),
  ]
})
export class ForecastModule { }