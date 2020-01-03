import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaffAttendancePage } from './staff-attendance.page';

const routes: Routes = [
  {
    path: '',
    component: StaffAttendancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffAttendancePageRoutingModule {}
