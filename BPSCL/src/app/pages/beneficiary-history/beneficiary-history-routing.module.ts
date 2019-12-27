import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeneficiaryHistoryPage } from './beneficiary-history.page';

const routes: Routes = [
  {
    path: '',
    component: BeneficiaryHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeneficiaryHistoryPageRoutingModule {}
