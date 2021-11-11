import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {RegisterPage} from './register.page';

const routes: Routes = [
    {
        path: 'email-one',
        loadChildren: () => import('./email-one/email-one.module').then(m => m.EmailOnePageModule)
    },
    {
        path: 'email-two',
        loadChildren: () => import('./email-two/email-two.module').then(m => m.EmailTwoPageModule)
    },
    {
        path: 'email-three',
        loadChildren: () => import('./email-three/email-three.module').then(m => m.EmailThreePageModule)
    },
    {
        path: 'phone-verify',
        loadChildren: () => import('./phone-verify/phone-verify.module').then(m => m.PhoneVerifyPageModule)
    },
    {
        path: '',
        component: RegisterPage,
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RegisterPageRoutingModule {
}
