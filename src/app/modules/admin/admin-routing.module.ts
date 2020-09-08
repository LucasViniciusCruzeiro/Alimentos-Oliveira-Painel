import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'shipping-company',
    loadChildren: () => import('./shipping-company/shipping-company.module').then(m => m.ShippingCompanyModule)
  },
  {
    path: 'factory',
    loadChildren: () => import('./factory/factory.module').then(m => m.FactoryModule)
  }, {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'plaque',
    loadChildren: () => import('./plaque/plaque.module').then(m => m.PlaqueModule)
  },
  {
    path: 'vehicle-type',
    loadChildren: () => import('./vehicle-type/vehicle-type.module').then(m => m.VehicleTypeModule)
  },
  {
    path: 'driver',
    loadChildren: () => import('./driver/driver.module').then(m => m.DriverModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
