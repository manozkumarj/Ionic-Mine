import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditDoctorProfilePage } from './edit-doctor-profile.page';

const routes: Routes = [
  {
    path: '',
    component: EditDoctorProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditDoctorProfilePageRoutingModule {}
