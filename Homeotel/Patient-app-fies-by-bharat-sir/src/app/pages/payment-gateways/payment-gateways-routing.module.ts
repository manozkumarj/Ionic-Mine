import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentGatewaysPage } from './payment-gateways.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentGatewaysPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentGatewaysPageRoutingModule {}
