import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditFilePageRoutingModule } from './edit-file-routing.module';

import { EditFilePage } from './edit-file.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditFilePageRoutingModule
  ],
  declarations: [EditFilePage]
})
export class EditFilePageModule {}
