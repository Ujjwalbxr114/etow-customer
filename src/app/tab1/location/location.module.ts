import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {LocationPage} from './location.page';
import {VehicleSelectionPageModule} from '../vehicle-selection/vehicle-selection.module';
import {LocationSelectionPageModule} from '../location-selection/location-selection.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        VehicleSelectionPageModule,
        LocationSelectionPageModule,
    ],
    exports: [
        LocationPage
    ],
    declarations: [LocationPage]
})
export class LocationPageModule {
}
