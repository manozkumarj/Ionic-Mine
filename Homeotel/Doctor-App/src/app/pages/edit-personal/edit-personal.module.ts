import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPersonalPageRoutingModule } from './edit-personal-routing.module';

import { EditPersonalPage } from './edit-personal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPersonalPageRoutingModule
  ],
  declarations: [EditPersonalPage]
})
export class EditPersonalPageModule {}
