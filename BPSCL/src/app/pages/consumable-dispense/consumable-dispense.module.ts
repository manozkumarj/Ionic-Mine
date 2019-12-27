import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { IonicModule } from '@ionic/angular';

import { ConsumableDispensePageRoutingModule } from './consumable-dispense-routing.module';

import { ConsumableDispensePage } from './consumable-dispense.page';
import { ExporterModule } from "./../../modules/exporter.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ExporterModule,
    ConsumableDispensePageRoutingModule
  ],
  declarations: [ConsumableDispensePage]
})
export class ConsumableDispensePageModule { }
