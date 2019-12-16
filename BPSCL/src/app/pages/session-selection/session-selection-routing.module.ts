import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SessionSelectionPage } from './session-selection.page';

const routes: Routes = [
  {
    path: '',
    component: SessionSelectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SessionSelectionPageRoutingModule {}
