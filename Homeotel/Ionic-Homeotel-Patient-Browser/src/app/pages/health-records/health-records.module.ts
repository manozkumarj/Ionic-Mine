import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { HealthRecordsPageRoutingModule } from "./health-records-routing.module";

import { HealthRecordsPage } from "./health-records.page";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HealthRecordsPageRoutingModule,
    FontAwesomeModule,
  ],
  declarations: [HealthRecordsPage],
})
export class HealthRecordsPageModule {}
