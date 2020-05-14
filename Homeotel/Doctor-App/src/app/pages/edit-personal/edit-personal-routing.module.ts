import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPersonalPage } from './edit-personal.page';

const routes: Routes = [
  {
    path: '',
    component: EditPersonalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPersonalPageRoutingModule {}
