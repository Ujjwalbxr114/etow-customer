import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmailOnePageRoutingModule } from './email-one-routing.module';

import { EmailOnePage } from './email-one.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmailOnePageRoutingModule
  ],
  declarations: [EmailOnePage]
})
export class EmailOnePageModule {}
