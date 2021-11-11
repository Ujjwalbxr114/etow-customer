import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {VehicleAddPageRoutingModule} from './vehicle-add-routing.module';

import {VehicleAddPage} from './vehicle-add.page';
import {VehicleInfoSelectionPageModule} from '../../../components/vehicle-info-selection/vehicle-info-selection.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        VehicleAddPageRoutingModule,
        VehicleInfoSelectionPageModule,
        ReactiveFormsModule
    ],
    declarations: [VehicleAddPage]
})
export class VehicleAddPageModule {
}
