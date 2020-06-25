import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ViewDoctorPageRoutingModule } from "./view-doctor-routing.module";

import { ViewDoctorPage } from "./view-doctor.page";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewDoctorPageRoutingModule,
    FontAwesomeModule,
  ],
  declarations: [ViewDoctorPage],
})
export class ViewDoctorPageModule {}
