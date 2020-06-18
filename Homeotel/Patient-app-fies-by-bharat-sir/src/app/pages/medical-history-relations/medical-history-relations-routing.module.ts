import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicalHistoryRelationsPage } from './medical-history-relations.page';

const routes: Routes = [
  {
    path: '',
    component: MedicalHistoryRelationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicalHistoryRelationsPageRoutingModule {}
