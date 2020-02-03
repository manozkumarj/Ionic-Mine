import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { IonicModule } from '@ionic/angular';

import { EditBeneficiaryPageRoutingModule } from './edit-beneficiary-routing.module';

import { EditBeneficiaryPage } from './edit-beneficiary.page';
import { ExporterModule } from "./../../modules/exporter.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditBeneficiaryPageRoutingModule,
    ExporterModule,
    ReactiveFormsModule
  ],
  declarations: [EditBeneficiaryPage]
})
export class EditBeneficiaryPageModule { }
