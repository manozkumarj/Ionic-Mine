import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { VitalsPageRoutingModule } from "./vitals-routing.module";

import { VitalsPage } from "./vitals.page";
import { ExporterModule } from "./../../modules/exporter.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VitalsPageRoutingModule,
    ExporterModule,
    ReactiveFormsModule
  ],
  declarations: [VitalsPage],
  exports: []
})
export class VitalsPageModule { }
