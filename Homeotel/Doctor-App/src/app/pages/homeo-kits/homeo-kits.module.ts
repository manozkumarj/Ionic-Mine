import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeoKitsPageRoutingModule } from './homeo-kits-routing.module';

import { HomeoKitsPage } from './homeo-kits.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeoKitsPageRoutingModule
  ],
  declarations: [HomeoKitsPage]
})
export class HomeoKitsPageModule {}
