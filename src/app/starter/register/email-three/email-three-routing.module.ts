import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmailThreePage } from './email-three.page';

const routes: Routes = [
  {
    path: '',
    component: EmailThreePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmailThreePageRoutingModule {}
