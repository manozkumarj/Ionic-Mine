import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicalHistoryRelationsPageRoutingModule } from './medical-history-relations-routing.module';

import { MedicalHistoryRelationsPage } from './medical-history-relations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicalHistoryRelationsPageRoutingModule
  ],
  declarations: [MedicalHistoryRelationsPage]
})
export class MedicalHistoryRelationsPageModule {}
