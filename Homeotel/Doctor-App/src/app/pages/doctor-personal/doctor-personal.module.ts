import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule , ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctorPersonalPageRoutingModule } from './doctor-personal-routing.module';

import { DoctorPersonalPage } from './doctor-personal.page';
import { DatePipe } from '@angular/common';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    DoctorPersonalPageRoutingModule
  ],
  providers :[DatePipe],
  declarations: [DoctorPersonalPage]
})
export class DoctorPersonalPageModule {}
