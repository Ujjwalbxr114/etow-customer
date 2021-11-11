import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmailTwoPageRoutingModule } from './email-two-routing.module';

import { EmailTwoPage } from './email-two.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmailTwoPageRoutingModule
  ],
  declarations: [EmailTwoPage]
})
export class EmailTwoPageModule {}
