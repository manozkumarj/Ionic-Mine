import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KitDetailsPage } from './kit-details.page';

const routes: Routes = [
  {
    path: '',
    component: KitDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KitDetailsPageRoutingModule {}
