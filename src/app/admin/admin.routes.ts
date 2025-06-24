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
                path:'accommodation',
                loadComponent:()=>import('./accommodation/accommodation').then(c=>c.AccommodationComponent)
            },
            {
                path:'users',
                loadComponent:()=>import('./user/user-profile').then(c=>c.UserProfileComponent)
            }
        ]
    }
];