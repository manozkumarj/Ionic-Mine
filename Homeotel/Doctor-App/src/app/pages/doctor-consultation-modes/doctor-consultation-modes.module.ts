import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctorConsultationModesPageRoutingModule } from './doctor-consultation-modes-routing.module';

import { DoctorConsultationModesPage } from './doctor-consultation-modes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctorConsultationModesPageRoutingModule
  ],
  declarations: [DoctorConsultationModesPage]
})
export class DoctorConsultationModesPageModule {}
