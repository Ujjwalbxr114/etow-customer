import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingSearchPageRoutingModule } from './booking-search-routing.module';

import { BookingSearchPage } from './booking-search.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        BookingSearchPageRoutingModule
    ],
    exports: [
        BookingSearchPage
    ],
    declarations: [BookingSearchPage]
})
export class BookingSearchPageModule {}
