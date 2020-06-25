import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { VitalsPageRoutingModule } from "./vitals-routing.module";

import { VitalsPage } from "./vitals.page";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VitalsPageRoutingModule,
    FontAwesomeModule,
  ],
  declarations: [VitalsPage],
})
export class VitalsPageModule {}
