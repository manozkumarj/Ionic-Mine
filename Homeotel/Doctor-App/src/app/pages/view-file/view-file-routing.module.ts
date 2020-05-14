import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewFilePage } from './view-file.page';

const routes: Routes = [
  {
    path: '',
    component: ViewFilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewFilePageRoutingModule {}
