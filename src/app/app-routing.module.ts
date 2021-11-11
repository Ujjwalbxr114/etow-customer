import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthedUserGuard} from './guards/authed-user.guard';
import {NonAuthedUserGuard} from './guards/non-authed-user.guard';

const routes: Routes = [
    {
        path: 'tabs',
        canActivate: [AuthedUserGuard],
        canActivateChild: [AuthedUserGuard],
        loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
    },
    {
        path: 'starter',
        canActivate: [NonAuthedUserGuard],
        canActivateChild: [NonAuthedUserGuard],
        loadChildren: () => import('./starter/starter.module').then(m => m.StarterPageModule)
    },
    {
        path: '',
        loadChildren: () => import('./main-redirector/main-redirector.module').then(m => m.MainRedirectorPageModule),
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
