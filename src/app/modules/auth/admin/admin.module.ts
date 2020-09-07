import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { LayoutModule } from 'app/layout/layout.module';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    LayoutModule
  ],
})

export class AdminModule { }

