import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { IonicModule } from '@ionic/angular';

import { SearchBeneficiaryPageRoutingModule } from './search-beneficiary-routing.module';

import { SearchBeneficiaryPage } from './search-beneficiary.page';
import { ExporterModule } from "./../../modules/exporter.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ExporterModule,
    SearchBeneficiaryPageRoutingModule
  ],
  declarations: [SearchBeneficiaryPage]
})
export class SearchBeneficiaryPageModule { }
