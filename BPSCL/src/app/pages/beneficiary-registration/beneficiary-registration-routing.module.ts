import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeneficiaryRegistrationPage } from './beneficiary-registration.page';

const routes: Routes = [
  {
    path: '',
    component: BeneficiaryRegistrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeneficiaryRegistrationPageRoutingModule {}
