import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { AppointmentDetailsPageRoutingModule } from "./appointment-details-routing.module";

import { AppointmentDetailsPage } from "./appointment-details.page";
import { MaterialModule } from "src/app/material.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AppointmentDetailsPageRoutingModule,
    MaterialModule,
  ],
  declarations: [AppointmentDetailsPage],
})
export class AppointmentDetailsPageModule {}
