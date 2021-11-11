import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {VehicleInfoSelectionPage} from './vehicle-info-selection.page';
import {FilterPipe} from '../../pipes/filter.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule
    ],
    declarations: [VehicleInfoSelectionPage, FilterPipe]
})
export class VehicleInfoSelectionPageModule {
}
