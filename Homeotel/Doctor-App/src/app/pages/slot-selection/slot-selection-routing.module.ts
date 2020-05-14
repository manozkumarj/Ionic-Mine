import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SlotSelectionPage } from './slot-selection.page';

const routes: Routes = [
  {
    path: '',
    component: SlotSelectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SlotSelectionPageRoutingModule {}
