import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompletedConsultationDetailsPage } from './completed-consultation-details.page';

const routes: Routes = [
  {
    path: '',
    component: CompletedConsultationDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompletedConsultationDetailsPageRoutingModule {}
