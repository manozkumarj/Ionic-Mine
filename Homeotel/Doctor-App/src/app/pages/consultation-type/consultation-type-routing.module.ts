import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultationTypePage } from './consultation-type.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultationTypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultationTypePageRoutingModule {}
