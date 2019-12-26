import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchBeneficiaryPage } from './search-beneficiary.page';

const routes: Routes = [
  {
    path: '',
    component: SearchBeneficiaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchBeneficiaryPageRoutingModule {}
