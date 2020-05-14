import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultationTypePageRoutingModule } from './consultation-type-routing.module';

import { ConsultationTypePage } from './consultation-type.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ConsultationTypePageRoutingModule
  ],
  declarations: [ConsultationTypePage]
})
export class ConsultationTypePageModule {}
