import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditDeveloperPage } from './edit-developer.page';

const routes: Routes = [
  {
    path: '',
    component: EditDeveloperPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditDeveloperPageRoutingModule {}
