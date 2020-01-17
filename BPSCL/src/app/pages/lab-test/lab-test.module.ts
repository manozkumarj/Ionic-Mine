import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { IonicModule } from '@ionic/angular';

import { LabTestPageRoutingModule } from './lab-test-routing.module';

import { LabTestPage } from './lab-test.page';
import { ExporterModule } from "./../../modules/exporter.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ExporterModule,
    LabTestPageRoutingModule
  ],
  declarations: [LabTestPage]
})
export class LabTestPageModule { }
