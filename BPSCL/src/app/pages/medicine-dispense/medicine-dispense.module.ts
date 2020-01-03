import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { IonicModule } from '@ionic/angular';

import { MedicineDispensePageRoutingModule } from './medicine-dispense-routing.module';

import { MedicineDispensePage } from './medicine-dispense.page';
import { ExporterModule } from "./../../modules/exporter.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ExporterModule,
    MedicineDispensePageRoutingModule
  ],
  declarations: [MedicineDispensePage]
})
export class MedicineDispensePageModule { }
