import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditLifestylePageRoutingModule } from './edit-lifestyle-routing.module';

import { EditLifestylePage } from './edit-lifestyle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditLifestylePageRoutingModule
  ],
  declarations: [EditLifestylePage]
})
export class EditLifestylePageModule {}
