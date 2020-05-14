import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScheduledAppointmentsPage } from './scheduled-appointments.page';

const routes: Routes = [
  {
    path: '',
    component: ScheduledAppointmentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScheduledAppointmentsPageRoutingModule {}
