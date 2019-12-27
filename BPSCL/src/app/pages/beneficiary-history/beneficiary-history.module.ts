import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { IonicModule } from '@ionic/angular';

import { BeneficiaryHistoryPageRoutingModule } from './beneficiary-history-routing.module';

import { BeneficiaryHistoryPage } from './beneficiary-history.page';
import { ExporterModule } from "./../../modules/exporter.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ExporterModule,
    BeneficiaryHistoryPageRoutingModule
  ],
  declarations: [BeneficiaryHistoryPage]
})
export class BeneficiaryHistoryPageModule { }
