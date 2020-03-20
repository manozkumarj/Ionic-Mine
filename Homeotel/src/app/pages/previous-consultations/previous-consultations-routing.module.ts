import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreviousConsultationsPage } from './previous-consultations.page';

const routes: Routes = [
  {
    path: '',
    component: PreviousConsultationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreviousConsultationsPageRoutingModule {}
