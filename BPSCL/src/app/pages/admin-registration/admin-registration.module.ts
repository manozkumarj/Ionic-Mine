import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { AdminRegistrationPageRoutingModule } from "./admin-registration-routing.module";

import { AdminRegistrationPage } from "./admin-registration.page";
import { ExporterModule } from "./../../modules/exporter.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminRegistrationPageRoutingModule,
    ExporterModule,
    ReactiveFormsModule
  ],
  declarations: [AdminRegistrationPage]
})
export class AdminRegistrationPageModule {}
