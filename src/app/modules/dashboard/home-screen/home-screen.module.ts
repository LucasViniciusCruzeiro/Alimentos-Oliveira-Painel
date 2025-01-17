import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view/view.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { FuseDirectivesModule } from '@fuse/directives/directives';
import { FilterComponent } from 'app/shared/components/several-components/filter/filter.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'index' },
  { path: 'index', component: ViewComponent },
];

@NgModule({
  declarations: [
    ViewComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    FuseDirectivesModule
  ],
  entryComponents: [FilterComponent],
})
export class HomeScreenModule { }
