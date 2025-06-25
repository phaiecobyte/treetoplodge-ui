import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadChildren:()=>import('./pages/customer.routes').then(r=>r.routes)
    },
    {
        path:'admin',
        loadChildren:()=>import('./admin/admin.routes').then(r=>r.routes)
    },
    {
        path:'login',
        loadComponent:()=>import('./pages/login/login').then(c=>c.LoginComponent)
    },
    {
        path:'register',
        loadComponent:()=>import('./pages/register/register').then(c=>c.RegisterComponent)
    }
];
