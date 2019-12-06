import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewDeveloperPage } from './view-developer.page';

const routes: Routes = [
  {
    path: '',
    component: ViewDeveloperPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewDeveloperPageRoutingModule {}
