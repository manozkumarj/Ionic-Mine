import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompletedConsultationDetailsPageRoutingModule } from './completed-consultation-details-routing.module';

import { CompletedConsultationDetailsPage } from './completed-consultation-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompletedConsultationDetailsPageRoutingModule
  ],
  declarations: [CompletedConsultationDetailsPage]
})
export class CompletedConsultationDetailsPageModule {}
