import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditRelationMedicalHistoryPageRoutingModule } from './edit-relation-medical-history-routing.module';

import { EditRelationMedicalHistoryPage } from './edit-relation-medical-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditRelationMedicalHistoryPageRoutingModule
  ],
  declarations: [EditRelationMedicalHistoryPage]
})
export class EditRelationMedicalHistoryPageModule {}
