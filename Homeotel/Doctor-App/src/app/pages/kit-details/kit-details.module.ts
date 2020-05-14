import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KitDetailsPageRoutingModule } from './kit-details-routing.module';

import { KitDetailsPage } from './kit-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    KitDetailsPageRoutingModule
  ],
  declarations: [KitDetailsPage]
})
export class KitDetailsPageModule {}
