import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorClinicsPage } from './doctor-clinics.page';

const routes: Routes = [
  {
    path: '',
    component: DoctorClinicsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorClinicsPageRoutingModule {}
