import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserConsultationDetailsPage } from './user-consultation-details.page';

const routes: Routes = [
  {
    path: '',
    component: UserConsultationDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserConsultationDetailsPageRoutingModule {}
