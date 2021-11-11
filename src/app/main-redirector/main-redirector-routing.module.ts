import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainRedirectorPage } from './main-redirector.page';

const routes: Routes = [
  {
    path: '',
    component: MainRedirectorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRedirectorPageRoutingModule {}
