import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { CareProvidedPageRoutingModule } from "./care-provided-routing.module";

import { CareProvidedPage } from "./care-provided.page";
import { ExporterModule } from "./../../modules/exporter.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CareProvidedPageRoutingModule,
    ExporterModule
  ],
  declarations: [CareProvidedPage]
})
export class CareProvidedPageModule {}
