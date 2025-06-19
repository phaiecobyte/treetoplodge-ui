import { Routes } from "@angular/router";
import { Main } from "./main/main";

export const routes:Routes=[
    {
        path:'',
        component:Main,
        children:[
            {
                path:'',
                redirectTo:'home',
                pathMatch:'full'
            },
            {
                path:'home',
                loadComponent:()=>import('./home/home').then(c=>c.Home)
            },
            {
                path:'accommodation',
                loadComponent:()=>import('./accommodation/accommodation').then(c=>c.Accommodation)
            },
            {
                path:'food-beverage',
                loadComponent:()=>import('./food-beverage/food-beverage').then(c=>c.FoodBeverage)
            },
            {
                path:'about',
                loadComponent:()=>import('./about/about').then(c=>c.About)
            },
            {
                path:'galary',
                loadComponent:()=>import('./galary/galary').then(c=>c.Galary)
            },
            
        ]
    }
]