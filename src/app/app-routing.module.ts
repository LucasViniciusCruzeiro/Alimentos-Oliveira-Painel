import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'city',
        loadChildren: () => import('./modules/city/city.module').then(m => m.CityModule)
      },
      {
        path: 'state',
        loadChildren: () => import('./modules/states/state.module').then(m => m.StateModule)
      },
      {
        path: 'production',
        loadChildren: () => import('./modules/production/production.module').then(m => m.ProductionModule)
      },
      {
        path: 'clients',
        loadChildren: () => import('./modules/client/client.module').then(m => m.ClientModule)
      },
      {
        path: 'ingredients',
        loadChildren: () => import('./modules/ingredients/ingredients.module').then(m => m.IngredientsModule)
      },
      {
        path: 'products',
        loadChildren: () => import('./modules/products/products.module').then(m => m.ProductsModule)
      },
      {
        path: 'sales',
        loadChildren: () => import('./modules/sales/sales.module').then(m => m.SalesModule)
      },
      {
        path: 'admin',
        loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
      },
    ]
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
