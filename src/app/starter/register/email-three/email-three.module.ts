import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {EmailThreePageRoutingModule} from './email-three-routing.module';

import {EmailThreePage} from './email-three.page';
import {VehicleInfoSelectionPageModule} from '../../../components/vehicle-info-selection/vehicle-info-selection.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        EmailThreePageRoutingModule,
        VehicleInfoSelectionPageModule
    ],
    declarations: [EmailThreePage]
})
export class EmailThreePageModule {
}
