import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppointmentQuestionsPage } from './appointment-questions.page';

const routes: Routes = [
  {
    path: '',
    component: AppointmentQuestionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentQuestionsPageRoutingModule {}
