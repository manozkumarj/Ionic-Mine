import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditDeveloperPageRoutingModule } from './edit-developer-routing.module';

import { EditDeveloperPage } from './edit-developer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditDeveloperPageRoutingModule
  ],
  declarations: [EditDeveloperPage]
})
export class EditDeveloperPageModule {}
