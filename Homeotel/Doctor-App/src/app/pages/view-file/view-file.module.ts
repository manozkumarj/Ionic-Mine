import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewFilePageRoutingModule } from './view-file-routing.module';

import { ViewFilePage } from './view-file.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewFilePageRoutingModule
  ],
  declarations: [ViewFilePage]
})
export class ViewFilePageModule {}
