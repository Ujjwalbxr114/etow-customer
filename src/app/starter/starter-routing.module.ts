import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {StarterPage} from './starter.page';

const routes: Routes = [
    {
        path: 'register',
        loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
    },
    {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
    },
    {
        path: '',
        component: StarterPage,
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class StarterPageRoutingModule {
}
