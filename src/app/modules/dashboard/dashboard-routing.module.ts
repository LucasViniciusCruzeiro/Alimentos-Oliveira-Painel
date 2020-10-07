import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./home-screen/home-screen.module').then(m => m.HomeScreenModule),
      },
      {
        path: 'stock',
        loadChildren: () => import('./stock/stock.module').then(m => m.StockModule),
      },
      {
        path: 'home-screen',
        loadChildren: () => import('./home-screen/home-screen.module').then(m => m.HomeScreenModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
