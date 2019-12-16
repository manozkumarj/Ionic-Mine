import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SessionSelectionPageRoutingModule } from './session-selection-routing.module';

import { SessionSelectionPage } from './session-selection.page';
import { ExporterModule } from "./../../modules/exporter.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SessionSelectionPageRoutingModule,
    ExporterModule
  ],
  declarations: [SessionSelectionPage]
})
export class SessionSelectionPageModule { }
