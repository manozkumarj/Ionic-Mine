import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClinicDetailsPage } from './clinic-details.page';

const routes: Routes = [
  {
    path: '',
    component: ClinicDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClinicDetailsPageRoutingModule {}
