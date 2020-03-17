import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultationDetailsPage } from './consultation-details.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultationDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultationDetailsPageRoutingModule {}
