import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctorClinicsPageRoutingModule } from './doctor-clinics-routing.module';

import { DoctorClinicsPage } from './doctor-clinics.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctorClinicsPageRoutingModule
  ],
  declarations: [DoctorClinicsPage]
})
export class DoctorClinicsPageModule {}
