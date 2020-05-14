import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorPersonalPage } from './doctor-personal.page';

const routes: Routes = [
  {
    path: '',
    component: DoctorPersonalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorPersonalPageRoutingModule {}
