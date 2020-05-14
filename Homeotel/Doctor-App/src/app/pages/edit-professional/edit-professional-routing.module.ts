import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditProfessionalPage } from './edit-professional.page';

const routes: Routes = [
  {
    path: '',
    component: EditProfessionalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditProfessionalPageRoutingModule {}
