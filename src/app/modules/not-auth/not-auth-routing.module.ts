import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'forgot-password',
        loadChildren: () => import('./forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
    },
    {
        path: 'reset-password',
        loadChildren: () => import('./reset-password/reset-password.component').then(m => m.ResetPasswordComponent)
    },
    {
        path: 'reset-password/:token',
        loadChildren: () => import('./reset-password/reset-password.component').then(m => m.ResetPasswordComponent)
    },
    {
        path: 'logout',
        loadChildren: () => import('./logout/logout.component').then(m => m.LogoutComponent)
    },
    {
        path: '**',
        redirectTo: 'login'
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NotAuthRoutingModule { }
