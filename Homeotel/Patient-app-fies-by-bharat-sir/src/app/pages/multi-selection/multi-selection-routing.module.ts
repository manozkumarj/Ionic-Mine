import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MultiSelectionPage } from './multi-selection.page';

const routes: Routes = [
  {
    path: '',
    component: MultiSelectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MultiSelectionPageRoutingModule {}
