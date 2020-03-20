import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VitalQuestionsPage } from './vital-questions.page';

const routes: Routes = [
  {
    path: '',
    component: VitalQuestionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VitalQuestionsPageRoutingModule {}
