import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {PhoneVerifyPage} from './phone-verify.page';
import {PhoneVerifyGuard} from './phone-verify.guard';

const routes: Routes = [
    {
        path: '',
        component: PhoneVerifyPage,
        canDeactivate: [PhoneVerifyGuard],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PhoneVerifyPageRoutingModule {
}
