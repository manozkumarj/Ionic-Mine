import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CareProvidedPage } from './care-provided.page';

const routes: Routes = [
  {
    path: '',
    component: CareProvidedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CareProvidedPageRoutingModule {}
