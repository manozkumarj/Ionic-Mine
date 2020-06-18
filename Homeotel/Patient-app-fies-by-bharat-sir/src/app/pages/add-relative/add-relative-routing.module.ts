import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddRelativePage } from './add-relative.page';

const routes: Routes = [
  {
    path: '',
    component: AddRelativePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddRelativePageRoutingModule {}
