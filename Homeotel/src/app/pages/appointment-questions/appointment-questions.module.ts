import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppointmentQuestionsPageRoutingModule } from './appointment-questions-routing.module';

import { AppointmentQuestionsPage } from './appointment-questions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppointmentQuestionsPageRoutingModule
  ],
  declarations: [AppointmentQuestionsPage]
})
export class AppointmentQuestionsPageModule {}
