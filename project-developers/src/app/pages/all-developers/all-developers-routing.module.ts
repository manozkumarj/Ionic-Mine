import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllDevelopersPage } from './all-developers.page';

const routes: Routes = [
  {
    path: '',
    component: AllDevelopersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllDevelopersPageRoutingModule {}
