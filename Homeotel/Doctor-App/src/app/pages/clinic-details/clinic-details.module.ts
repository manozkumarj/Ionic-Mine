import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClinicDetailsPageRoutingModule } from './clinic-details-routing.module';

import { ClinicDetailsPage } from './clinic-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ClinicDetailsPageRoutingModule
  ],
  declarations: [ClinicDetailsPage]
})
export class ClinicDetailsPageModule {}
