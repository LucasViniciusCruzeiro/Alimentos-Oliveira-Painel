import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuseDirectivesModule } from '@fuse/directives/directives';
import { SharedModule } from 'app/shared/shared.module';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: ViewComponent },
  { path: 'index', redirectTo: '' },
];

@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FuseDirectivesModule,
    RouterModule.forChild(routes),
  ],
})
export class HomeScreenModule { }
