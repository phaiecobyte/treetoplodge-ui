import { Routes } from '@angular/router';
import { Admin } from './admin';

export const routes: Routes = [
    {
        path:'',
        component:Admin,
        children:[
            {
                path:'',
                redirectTo:'dashboard',
                pathMatch:'full'
            },
            {
                path:'dashboard',
                loadComponent:()=>import('./dashboard/dashboard').then(c=>c.DashboardComponent)
            },
            {
                path:'user',
                loadComponent:()=>import('./user/user').then(c=>c.UserComponent)
            }
        ]
    }
];