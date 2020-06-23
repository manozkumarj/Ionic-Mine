import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditFilePage } from './edit-file.page';

const routes: Routes = [
  {
    path: '',
    component: EditFilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditFilePageRoutingModule {}
