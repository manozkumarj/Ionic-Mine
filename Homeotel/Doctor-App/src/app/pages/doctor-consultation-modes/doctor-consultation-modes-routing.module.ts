import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorConsultationModesPage } from './doctor-consultation-modes.page';

const routes: Routes = [
  {
    path: '',
    component: DoctorConsultationModesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorConsultationModesPageRoutingModule {}
