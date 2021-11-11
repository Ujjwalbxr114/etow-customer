import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingSearchPage } from './booking-search.page';

const routes: Routes = [
  {
    path: '',
    component: BookingSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingSearchPageRoutingModule {}
