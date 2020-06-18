import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MultiSelectionPageRoutingModule } from './multi-selection-routing.module';

import { MultiSelectionPage } from './multi-selection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MultiSelectionPageRoutingModule
  ],
  declarations: [MultiSelectionPage]
})
export class MultiSelectionPageModule {}
