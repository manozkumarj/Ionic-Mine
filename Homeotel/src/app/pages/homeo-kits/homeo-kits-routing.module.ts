import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeoKitsPage } from './homeo-kits.page';

const routes: Routes = [
  {
    path: '',
    component: HomeoKitsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeoKitsPageRoutingModule {}
