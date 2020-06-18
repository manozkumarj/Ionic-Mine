import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditLifestylePage } from './edit-lifestyle.page';

const routes: Routes = [
  {
    path: '',
    component: EditLifestylePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditLifestylePageRoutingModule {}
