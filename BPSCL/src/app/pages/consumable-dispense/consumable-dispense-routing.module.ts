import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsumableDispensePage } from './consumable-dispense.page';

const routes: Routes = [
  {
    path: '',
    component: ConsumableDispensePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsumableDispensePageRoutingModule {}
