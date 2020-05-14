import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyDoctorsPageRoutingModule } from './my-doctors-routing.module';

import { MyDoctorsPage } from './my-doctors.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyDoctorsPageRoutingModule
  ],
  declarations: [MyDoctorsPage]
})
export class MyDoctorsPageModule {}
