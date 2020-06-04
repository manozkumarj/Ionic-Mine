import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserConsultationDetailsPageRoutingModule } from './user-consultation-details-routing.module';

import { UserConsultationDetailsPage } from './user-consultation-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserConsultationDetailsPageRoutingModule
  ],
  declarations: [UserConsultationDetailsPage]
})
export class UserConsultationDetailsPageModule {}
