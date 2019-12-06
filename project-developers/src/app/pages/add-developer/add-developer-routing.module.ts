import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddDeveloperPage } from './add-developer.page';

const routes: Routes = [
  {
    path: '',
    component: AddDeveloperPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddDeveloperPageRoutingModule {}
