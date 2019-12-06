import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllDevelopersPageRoutingModule } from './all-developers-routing.module';

import { AllDevelopersPage } from './all-developers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllDevelopersPageRoutingModule
  ],
  declarations: [AllDevelopersPage]
})
export class AllDevelopersPageModule {}
