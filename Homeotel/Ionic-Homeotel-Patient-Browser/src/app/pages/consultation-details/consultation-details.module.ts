import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ConsultationDetailsPageRoutingModule } from "./consultation-details-routing.module";

import { ConsultationDetailsPage } from "./consultation-details.page";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsultationDetailsPageRoutingModule,
    FontAwesomeModule,
  ],
  declarations: [ConsultationDetailsPage],
})
export class ConsultationDetailsPageModule {}
