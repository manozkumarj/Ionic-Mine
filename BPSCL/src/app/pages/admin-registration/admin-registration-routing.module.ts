import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminRegistrationPage } from './admin-registration.page';

const routes: Routes = [
  {
    path: '',
    component: AdminRegistrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRegistrationPageRoutingModule {}
