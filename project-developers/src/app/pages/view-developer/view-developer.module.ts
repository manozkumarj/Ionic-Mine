import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewDeveloperPageRoutingModule } from './view-developer-routing.module';

import { ViewDeveloperPage } from './view-developer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewDeveloperPageRoutingModule
  ],
  declarations: [ViewDeveloperPage]
})
export class ViewDeveloperPageModule {}
