import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {WorkshopPageRoutingModule} from './workshop-routing.module';

import {WorkshopPage} from './workshop.page';
import {WorkshopSelectionPageModule} from '../workshop-selection/workshop-selection.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        WorkshopPageRoutingModule,
        WorkshopSelectionPageModule
    ],
    exports: [
        WorkshopPage
    ],
    declarations: [WorkshopPage]
})
export class WorkshopPageModule {
}
