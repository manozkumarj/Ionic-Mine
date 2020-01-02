import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { StaffRegistrationPageRoutingModule } from "./staff-registration-routing.module";

import { StaffRegistrationPage } from "./staff-registration.page";
import { ExporterModule } from "./../../modules/exporter.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StaffRegistrationPageRoutingModule,
    ExporterModule,
    ReactiveFormsModule
  ],
  declarations: [StaffRegistrationPage]
})
export class StaffRegistrationPageModule { }
