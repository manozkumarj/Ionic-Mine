import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditProfessionalPageRoutingModule } from './edit-professional-routing.module';

import { EditProfessionalPage } from './edit-professional.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditProfessionalPageRoutingModule
  ],
  declarations: [EditProfessionalPage]
})
export class EditProfessionalPageModule {}
