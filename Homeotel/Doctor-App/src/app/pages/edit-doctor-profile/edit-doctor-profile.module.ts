import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditDoctorProfilePageRoutingModule } from './edit-doctor-profile-routing.module';

import { EditDoctorProfilePage } from './edit-doctor-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditDoctorProfilePageRoutingModule
  ],
  declarations: [EditDoctorProfilePage]
})
export class EditDoctorProfilePageModule {}
