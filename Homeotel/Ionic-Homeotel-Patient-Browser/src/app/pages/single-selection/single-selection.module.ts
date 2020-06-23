import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleSelectionPageRoutingModule } from './single-selection-routing.module';

import { SingleSelectionPage } from './single-selection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingleSelectionPageRoutingModule
  ],
  declarations: [SingleSelectionPage]
})
export class SingleSelectionPageModule {}
