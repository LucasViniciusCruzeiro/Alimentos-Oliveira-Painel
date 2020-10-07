import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { LoadingComponent } from './loading.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
  ],
  declarations: [
    LoadingComponent,
  ],
  exports: [
    LoadingComponent,
  ],
})

export class LoadingModule { }
