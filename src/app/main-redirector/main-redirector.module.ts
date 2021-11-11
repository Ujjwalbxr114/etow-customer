import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainRedirectorPageRoutingModule } from './main-redirector-routing.module';

import { MainRedirectorPage } from './main-redirector.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainRedirectorPageRoutingModule
  ],
  declarations: [MainRedirectorPage]
})
export class MainRedirectorPageModule {}
