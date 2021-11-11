import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmailOnePage } from './email-one.page';

const routes: Routes = [
  {
    path: '',
    component: EmailOnePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmailOnePageRoutingModule {}
