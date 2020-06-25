import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { DoctorsPageRoutingModule } from "./doctors-routing.module";

import { DoctorsPage } from "./doctors.page";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctorsPageRoutingModule,
    FontAwesomeModule,
  ],
  declarations: [DoctorsPage],
})
export class DoctorsPageModule {}
