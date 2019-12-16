import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { DoctorPageRoutingModule } from "./doctor-routing.module";

import { DoctorPage } from "./doctor.page";
import { ExporterModule } from "./../../modules/exporter.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctorPageRoutingModule,
    ExporterModule
  ],
  declarations: [DoctorPage]
})
export class DoctorPageModule {}
