import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VitalQuestionsPageRoutingModule } from './vital-questions-routing.module';

import { VitalQuestionsPage } from './vital-questions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VitalQuestionsPageRoutingModule
  ],
  declarations: [VitalQuestionsPage]
})
export class VitalQuestionsPageModule {}
