import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditRelationMedicalHistoryPage } from './edit-relation-medical-history.page';

const routes: Routes = [
  {
    path: '',
    component: EditRelationMedicalHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditRelationMedicalHistoryPageRoutingModule {}
