import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { IonicModule } from '@ionic/angular';

import { StaffAttendancePageRoutingModule } from './staff-attendance-routing.module';

import { StaffAttendancePage } from './staff-attendance.page';
import { ExporterModule } from "./../../modules/exporter.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ExporterModule,
    StaffAttendancePageRoutingModule
  ],
  declarations: [StaffAttendancePage]
})
export class StaffAttendancePageModule { }
