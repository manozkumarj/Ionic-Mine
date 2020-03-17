import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SlotSelectionPageRoutingModule } from './slot-selection-routing.module';

import { SlotSelectionPage } from './slot-selection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SlotSelectionPageRoutingModule
  ],
  declarations: [SlotSelectionPage]
})
export class SlotSelectionPageModule {}
