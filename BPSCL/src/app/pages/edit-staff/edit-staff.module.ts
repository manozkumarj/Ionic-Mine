import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { EditStaffPageRoutingModule } from "./edit-staff-routing.module";

import { EditStaffPage } from "./edit-staff.page";
import { ExporterModule } from "./../../modules/exporter.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditStaffPageRoutingModule,
    ExporterModule
  ],
  declarations: [EditStaffPage]
})
export class EditStaffPageModule {}
