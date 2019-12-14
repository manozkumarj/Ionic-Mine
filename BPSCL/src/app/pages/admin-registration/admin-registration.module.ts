import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminRegistrationPageRoutingModule } from './admin-registration-routing.module';

import { AdminRegistrationPage } from './admin-registration.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminRegistrationPageRoutingModule
  ],
  declarations: [AdminRegistrationPage]
})
export class AdminRegistrationPageModule {}
