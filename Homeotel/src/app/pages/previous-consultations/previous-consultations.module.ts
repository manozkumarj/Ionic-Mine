import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreviousConsultationsPageRoutingModule } from './previous-consultations-routing.module';

import { PreviousConsultationsPage } from './previous-consultations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreviousConsultationsPageRoutingModule
  ],
  declarations: [PreviousConsultationsPage]
})
export class PreviousConsultationsPageModule {}
