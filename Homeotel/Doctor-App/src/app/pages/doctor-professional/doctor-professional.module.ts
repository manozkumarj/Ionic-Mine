import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctorProfessionalPageRoutingModule } from './doctor-professional-routing.module';

import { DoctorProfessionalPage } from './doctor-professional.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctorProfessionalPageRoutingModule
  ],
  declarations: [DoctorProfessionalPage]
})
export class DoctorProfessionalPageModule {}
