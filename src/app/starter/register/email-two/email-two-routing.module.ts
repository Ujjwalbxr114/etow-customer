import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmailTwoPage } from './email-two.page';

const routes: Routes = [
  {
    path: '',
    component: EmailTwoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmailTwoPageRoutingModule {}
