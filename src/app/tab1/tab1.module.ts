import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Tab1Page} from './tab1.page';

import {Tab1PageRoutingModule} from './tab1-routing.module';
import {MainPageModule} from './main/main.module';
import {LocationPageModule} from './location/location.module';
import {VehicleSelectionPageModule} from './vehicle-selection/vehicle-selection.module';
import {BookingSearchPageModule} from './booking-search/booking-search.module';
import {WorkshopPageModule} from './workshop/workshop.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        Tab1PageRoutingModule,
        MainPageModule,
        LocationPageModule,
        VehicleSelectionPageModule,
        BookingSearchPageModule,
        WorkshopPageModule
    ],
    declarations: [Tab1Page]
})
export class Tab1PageModule {
}
